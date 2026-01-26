import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const method = req.method;

  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');
  const res = await authFetch(
    `/api/project?pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method },
  );
  return routeResponse(req, res);
}
