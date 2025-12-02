import authFetch from '@/lib/interceptor/auth/authFetch';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/lib/serverApi/routeResponse';
import { COOKIE, deleteCookieValue } from '@/lib/cookie';

export async function POST(req: NextRequest) {
  const res = await authFetch('/api/user/logout', { method: 'POST' });

  if (res.ok) {
    deleteCookieValue(COOKIE.USER_ID);
    deleteCookieValue(COOKIE.ACS_TOKEN);
    deleteCookieValue(COOKIE.REF_TOKEN);
  }

  return routeResponse(req, res);
}
