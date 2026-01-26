import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function POST(req: NextRequest) {
  const method = req.method;
  const reqData = await req.json();

  const res = await authFetch(`/api/project/auth/leave`, {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
