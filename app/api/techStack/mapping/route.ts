import { NextRequest } from 'next/server';
import publicFetch from '@/lib/interceptor/public/publicFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const res = await publicFetch('/api/techStackMapping');

  return routeResponse(req, res);
}
