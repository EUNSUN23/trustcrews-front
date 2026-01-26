import publicFetch from '@/lib/interceptor/public/publicFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const res = await publicFetch(
    `/api/user/public/checkNickname/${searchParams.get('nickname')}`,
  );

  return routeResponse(req, res);
}
