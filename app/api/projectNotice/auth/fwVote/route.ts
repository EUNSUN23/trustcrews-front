import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const voteId = searchParams.get('voteId');
  const fwMemberId = searchParams.get('fwMemberId');
  const reqUrl = `/api/projectNotice/fwVote?voteId=${voteId}&fwMemberId=${fwMemberId}`;
  const method = req.method;

  const res = await authFetch(reqUrl, { method });
  return routeResponse(req, res);
}

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const method = req.method;

  const res = await authFetch('/api/projectNotice/fwVote', {
    method,
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(req, res);
}
