import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const pageNumber = searchParams.get('pageNumber');
  const userId = searchParams.get('userId');

  const res = await authFetch(
    `/api/projectHistory?userId=${userId}&pageNumber=${pageNumber}`,
  );

  return routeResponse(req, res);
}
