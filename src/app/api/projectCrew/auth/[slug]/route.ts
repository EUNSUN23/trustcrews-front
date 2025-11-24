import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';
import { getCookieValue } from '@/lib/cookieUtils';
import { COOKIE } from '@/constants/cookie';
import { bigIntToString } from '@/shared/utils/stringUtils';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const method = req.method;
  const currentUserId = getCookieValue(COOKIE.USER_ID);

  const res = await authFetch(`/api/projectCrew/${params.slug}`, { method });

  return routeResponse(req, res, (resBody) => ({
    ...resBody,
    data: {
      ...resBody.data,
      isCurrentUser: bigIntToString(resBody.data.user.userId) === currentUserId,
    },
  }));
}
