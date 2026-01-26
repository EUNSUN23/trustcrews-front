import { NextRequest } from 'next/server';
import { routeResponse } from '@/lib/serverApi/routeResponse';
import publicFetch from '@/lib/interceptor/public/publicFetch';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = req.method;

  const projectId = searchParams.get('projectId');

  const res = await publicFetch(`/api/project/public/${projectId}`, {
    method,
  });
  return routeResponse(req, res);
}
