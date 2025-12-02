import { HttpError } from '@/lib/error/HttpError';
import { getDefaultHttpErrorMessage } from '@/lib/error/getDefaultHttpErrorMessage';
import { HttpStatusCode } from 'axios';

export const createErrorResponse = async (error: unknown) => {
  let status = HttpStatusCode.InternalServerError;
  let message = getDefaultHttpErrorMessage(status);

  if (error instanceof Error) {
    if (error instanceof HttpError) {
      message = error.message;
      status = error.status;
    } else {
      message = '현재 서비스를 이용하실 수 없습니다.';
      status = HttpStatusCode.ServiceUnavailable;
    }
  }

  return new Response(
    JSON.stringify({
      result: 'fail',
      data: null,
      message,
    }),
    {
      status,
    },
  );
};
