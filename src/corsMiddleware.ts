import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { COOKIE } from '@/constants/cookie';

const allowedOrigins = [process.env.NEXT_PUBLIC_URL];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers':
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
};

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

const corsMiddleware = (request: NextRequest) => {
  if (!isAuthorizedApiRequest(request)) {
    return NextResponse.next({
      status: HttpStatusCode.Unauthorized,
      statusText: 'Unauthorized',
    });
  }
  //
  // const origin = request.headers.get('origin') ?? '';
  // const isAllowedOrigin = allowedOrigins.includes(origin);
  //
  // const isPreflight = request.method === 'OPTIONS';
  //
  // if (isPreflight) {
  //   const preflightHeaders = {
  //     ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
  //     ...corsOptions,
  //   };
  //
  //   return NextResponse.json({}, { headers: preflightHeaders });
  // }

  const response = NextResponse.next();
  // if (isAllowedOrigin) {
  //   response.headers.set('Access-Control-Allow-Origin', origin);
  // }
  //
  // Object.entries(corsOptions).forEach(([key, value]) => {
  //   response.headers.set(key, value);
  // });

  return response;
};

export default corsMiddleware;
