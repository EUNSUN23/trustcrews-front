import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await authFetch(`/api/project`, {
    method: 'POST',
    body: JSONReplaceBigInt(data),
  });

  return routeResponse(req, res);
}
