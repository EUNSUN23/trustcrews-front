import { NextRequest } from 'next/server';
import authFetch from '@/lib/interceptor/auth/authFetch';
import { routeResponse } from '@/lib/serverApi/routeResponse';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const method = req.method;

  const noticeId = searchParams.get('noticeId');
  const applyId = searchParams.get('applyId');
  const voteId = searchParams.get('voteId');

  const reqUrl = `/api/projectNotice/rcVote?noticeId=${noticeId}&applyId=${applyId}&voteId=${voteId}`;
  const res = await authFetch(reqUrl, { method });

  return routeResponse(req, res);
}
