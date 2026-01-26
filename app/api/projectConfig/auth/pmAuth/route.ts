import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const method = req.method;
  const res = await authFetch(`/api/projectConfig/pmAuth/${projectId}`, {
    method,
  });

  return routeResponse(req, res);
}

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authFetch('/api/projectConfig/pmAuth', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
