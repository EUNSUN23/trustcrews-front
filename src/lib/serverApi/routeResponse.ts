import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { ResponseBody } from '@/shared/types/responseBody';

export async function routeResponse(
  req: NextRequest,
  res: Response,
  dataManipulator?: (
    resBody: ResponseBody<Record<string, any>>,
  ) => ResponseBody<Record<string, any>>,
) {
  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(
      typeof dataManipulator === 'function' ? dataManipulator(data) : data,
    );
  } else {
    return res;
  }
}
