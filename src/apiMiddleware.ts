import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { COOKIE } from '@/constants/cookie';

const isAuthorizedApiRequest = (request: NextRequest) => {
  const authRouteMatcher = new RegExp(
    /(\/api)\/((.*)(((\/(?=(auth))).*)|(user\s))|(user.*))/,
    'i',
  );
  if (!authRouteMatcher.test(request.nextUrl.pathname)) return true;

  return (
    request.cookies.has(COOKIE.ACS_TOKEN) &&
    request.cookies.has(COOKIE.REF_TOKEN)
  );
};

const apiMiddleware = (request: NextRequest) => {
  if (!isAuthorizedApiRequest(request)) {
    return NextResponse.next({
      status: HttpStatusCode.Unauthorized,
      statusText: 'Unauthorized',
    });
  }

  return NextResponse.next();
};

export default apiMiddleware;
