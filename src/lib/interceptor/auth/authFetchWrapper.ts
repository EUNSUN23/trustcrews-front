import 'server-only';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';
import { createRequestHeaders } from '@/lib/interceptor/createRequestHeaders';
import { COOKIE, getCookieValue } from '@/lib/cookie';
import { createErrorResponse } from '@/lib/interceptor/createErrorResponse';
import { HttpError } from '@/lib/error/HttpError';
import { HttpStatusCode } from 'axios';
import resetCurrentUserAuth from '@/lib/interceptor/auth/resetCurrentUserAuth';
import revalidatingUsers from '@/lib/interceptor/auth/revalidatingUsers';
import pendingRequest from '@/lib/interceptor/auth/pendingRequest';

export const authFetchWrapper = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async (
    url: string | URL,
    requestInit?: RequestInit,
  ): Promise<Response> => {
    const userId = getCookieValue(COOKIE.USER_ID);
    if (!revalidatingUsers.has(userId)) {
      if (requestInit) requestInit.headers = createRequestHeaders(requestInit);

      try {
        return await fetch(url, { ...requestInit });
      } catch (e) {
        if (
          e instanceof HttpError &&
          e.status === HttpStatusCode.Unauthorized
        ) {
          resetCurrentUserAuth();
        }

        return createErrorResponse(e);
      }
    } else {
      return new Promise((resolve) => {
        pendingRequest.add(userId, async (error: Error | null) => {
          let response: Response;

          if (error) {
            if (
              error instanceof HttpError &&
              error.status === HttpStatusCode.Unauthorized
            ) {
              resetCurrentUserAuth();
            }
            response = await createErrorResponse(error);
          } else {
            if (requestInit)
              requestInit.headers = createRequestHeaders(requestInit);

            try {
              response = await fetch(url, { ...requestInit });
            } catch (fetchError) {
              response = await createErrorResponse(fetchError);
            }
          }
          resolve(response);
        });
      });
    }
  };
};
