import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

export async function GET(req: NextRequest) {
  const method = req.method;
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const res = await authFetch(`/api/projectConfig/post/${projectId}`, {
    method,
  });
  return routeResponse(req, res);
}

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authFetch('/api/projectConfig/post', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
