import authFetch from '@/lib/interceptor/auth/authFetch';
import { NextRequest } from 'next/server';
import { routeResponse } from '@/lib/serverApi/routeResponse';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  const res = await authFetch(`/api/projectJobs/milestone/list/${projectId}`, {
    method: 'GET',
  });

  return routeResponse(req, res);
}

export async function POST(req: NextRequest) {
  const { projectId, content, startDate, endDate, userPMAuth } =
    await req.json();

  const res = await authFetch(`/api/projectJobs/milestone`, {
    method: 'POST',
    body: JSONReplaceBigInt({
      projectId,
      content,
      startDate,
      endDate,
      userPMAuth,
    }),
  });

  return routeResponse(req, res);
}

export async function PATCH(req: NextRequest) {
  const { content, startDate, endDate, milestoneId, progressStatusCode } =
    await req.json();

  const res = await authFetch(`/api/projectJobs/milestone/${milestoneId}`, {
    method: 'PATCH',
    body: JSONReplaceBigInt({
      content,
      startDate,
      endDate,
      progressStatusCode,
    }),
  });

  return routeResponse(req, res);
}

export async function DELETE(request: NextRequest) {
  const reqData = await request.json();

  const res = await authFetch(`/api/projectJobs/milestone`, {
    method: 'DELETE',
    body: JSONReplaceBigInt(reqData),
  });

  return routeResponse(request, res);
}
