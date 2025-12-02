import 'server-only';
import { refreshToken } from '@/lib/interceptor/auth/refreshToken';
import { reqLogger, resLogger } from '@/lib/interceptor/interceptorLogger';
import { authFetchWrapper } from '@/lib/interceptor/auth/authFetchWrapper';
import { COOKIE, getCookieValue } from '@/lib/cookie';
import { getResponseErrorMessage } from '@/lib/interceptor/getResponseErrorMessage';
import { HttpError } from '@/lib/error/HttpError';
import { HttpStatusCode } from 'axios';
import pendingRequest from '@/lib/interceptor/auth/pendingRequest';
import pendingRetryRequest from '@/lib/interceptor/auth/pendingRetryRequest';
import revalidatingUsers from '@/lib/interceptor/auth/revalidatingUsers';
import { BACKEND_URL } from '@/shared/constants/processEnv';

const authFetch = authFetchWrapper({
  baseUrl: BACKEND_URL,
  interceptors: {
    request: async (requestArgs) => {
      try {
        const requestInit = requestArgs[1];
        const accessToken = getCookieValue(COOKIE.ACS_TOKEN);

        // 액세스 토큰 세팅
        const headers = new Headers(requestInit.headers);
        headers.set('Authorization', `Bearer ${accessToken}`);
        requestInit.headers = headers;

        if (requestInit.body instanceof FormData) {
          const headers = new Headers(requestInit.headers);
          headers.delete('Content-Type');
          requestInit.headers = headers;
        }

        // todo - sentry log 추가
        reqLogger.i(`${requestInit.method}: ${requestArgs[0]}`);
      } catch (error: unknown) {
        // todo - sentry log 추가 & error.message 로깅
        throw new HttpError(HttpStatusCode.BadRequest);
      }

      return requestArgs;
    },
    response: async (response, requestArgs) => {
      const url = requestArgs[0];
      const requestInit = requestArgs[1];

      if (response.ok) {
        // todo - sentry log 추가
        resLogger.i(`${requestInit.method} ${response.status}:  ${url}`);
        return response;
      } else if (response.status === HttpStatusCode.Unauthorized) {
        const userId = getCookieValue(COOKIE.USER_ID);
        const retryOriginalRequest = new Promise<Response>(
          (resolve, reject) => {
            pendingRetryRequest.add(userId, async (error: Error | null) => {
              if (error) {
                // 토큰 재발급 실패
                reject(error);
              } else {
                // 토큰 재발급 성공 - retry
                try {
                  const newAccessToken = getCookieValue(COOKIE.ACS_TOKEN);
                  const headers = new Headers(requestInit.headers);
                  headers.set('Authorization', `Bearer ${newAccessToken}`);

                  // body가 FormData일 경우 fetch시 자동으로 Content-Type 설정하도록
                  if (requestInit.body instanceof FormData) {
                    headers.delete('Content-Type');
                  }
                  requestInit.headers = headers;
                } catch (error: unknown) {
                  // todo - sentry log 추가 & error.message 로깅
                  throw new HttpError(HttpStatusCode.BadRequest);
                }

                const retryResponse = await authFetch(...requestArgs);
                resolve(retryResponse);
              }
            });
          },
        );

        if (!revalidatingUsers.has(userId)) {
          // 계정당 최초 토큰 재발급 요청 1개만 수행
          revalidatingUsers.add(userId);
          try {
            await refreshToken();
            // 재발급 요청 완료되면 계정의 대기중인 모든 요청 수행
            pendingRetryRequest.process(userId, null);
            pendingRequest.process(userId, null);
          } catch (e) {
            const error = new HttpError(HttpStatusCode.Unauthorized);
            pendingRetryRequest.process(userId, error);
            pendingRequest.process(userId, error);
          } finally {
            revalidatingUsers.delete(userId);
          }
        }
        return retryOriginalRequest;
      } else {
        const errorMessage = await getResponseErrorMessage(response);
        resLogger.i(
          `${requestInit.method} ${response.status}:  ${url} - ${errorMessage}`,
        );
        throw new HttpError(response.status, response.statusText, errorMessage);
      }
    },
  },
});

export default authFetch;
