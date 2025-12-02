import publicFetch from '@/lib/interceptor/public/publicFetch';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { routeResponse } from '@/lib/serverApi/routeResponse';
import { getRefreshTokenFromHeader } from '@/lib/interceptor/getRefreshTokenFromHeader';
import { HttpStatusCode } from 'axios';
import { createErrorResponse } from '@/lib/interceptor/createErrorResponse';
import { HttpError } from '@/lib/error/HttpError';
import { COOKIE } from '@/lib/cookie';

export async function POST(req: NextRequest) {
  const loginRequest = await req.json();

  const res = await publicFetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify(loginRequest),
    credentials: 'include',
  });

  if (res.ok) {
    const { headers } = res;
    const accessToken = headers.get('Authorization');
    const setCookieHeader = headers.get('Set-Cookie');

    const cookieStore = cookies();
    if (accessToken && setCookieHeader) {
      const { token, options } = getRefreshTokenFromHeader(setCookieHeader);
      cookieStore.set(COOKIE.ACS_TOKEN, accessToken, {
        ...options,
        sameSite: 'strict',
      });
      cookieStore.set(COOKIE.REF_TOKEN, token, {
        ...options,
        sameSite: 'strict',
      });
    } else {
      const error = new HttpError(HttpStatusCode.InternalServerError);
      // todo - sentry error log
      return createErrorResponse(error);
    }

    const copiedRes = res.clone();
    const resData = await copiedRes.json();
    cookieStore.set(COOKIE.USER_ID, resData.data!);
  }

  return routeResponse(req, res);
}
