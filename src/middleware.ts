import { NextRequest, NextResponse } from 'next/server';
import apiMiddleware from '@/apiMiddleware';
import { COOKIE } from '@/constants/cookie';

const isAuthorizedRequest = (request: NextRequest) => {
  const authRouteMatcher = new RegExp(
    /(((project|user)(\/(?!(login|signup|nickname|public))).*)|((project|user|launch)\s))/,
    'i',
  );
  if (!authRouteMatcher.test(request.nextUrl.pathname)) return true;

  return (
    request.cookies.has(COOKIE.ACS_TOKEN) &&
    request.cookies.has(COOKIE.REF_TOKEN)
  );
};

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api'))
    return apiMiddleware(request);

  if (!isAuthorizedRequest(request))
    return NextResponse.redirect(new URL('/login', request.url));

  return NextResponse.next();
}
