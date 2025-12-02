import { getDefaultHttpErrorMessage } from '@/lib/error/getDefaultHttpErrorMessage';

export class HttpError extends Error {
  status: number;
  statusText?: string;

  constructor(status: number, statusText?: string, errorMessage?: string) {
    super(`${errorMessage || getDefaultHttpErrorMessage(status)}`.trim());
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}
