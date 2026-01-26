import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function POST(req: NextRequest) {
  const { projectId } = await req.json();
  const res = await authFetch(`/api/project/${projectId}/end`, {
    method: 'POST',
  });

  return routeResponse(req, res);
}
