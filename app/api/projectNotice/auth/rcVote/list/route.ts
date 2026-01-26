import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get('projectId');
  const pageIndex = searchParams.get('pageIndex');
  const itemCount = searchParams.get('itemCount');

  const method = req.method;
  const res = await authFetch(
    `/api/projectNotice/rcVote/list?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
    { method },
  );

  return routeResponse(req, res);
}
