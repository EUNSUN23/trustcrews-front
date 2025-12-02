import 'server-only';
import { getDefaultHttpErrorMessage } from '@/lib/error/getDefaultHttpErrorMessage';

export const getResponseErrorMessage = async (
  response: Response,
): Promise<string> => {
  const copied = response.clone();
  const body = await copied.json().catch(() => null);
  return body.message
    ? body.message
    : getDefaultHttpErrorMessage(response.status);
};
