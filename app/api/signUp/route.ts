import publicFetch from '@/lib/interceptor/public/publicFetch';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function POST(req: NextRequest) {
  const signUpRequest = await req.json();
  const res = await publicFetch('/api/signUp', {
    method: 'POST',
    body: JSON.stringify(signUpRequest),
  });

  return routeResponse(req, res);
}
