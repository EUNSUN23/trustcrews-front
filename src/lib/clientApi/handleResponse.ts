import { HttpError } from '@/lib/error/HttpError';

const handleResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    const body = await res.json().catch(() => null);

    throw new HttpError(res.status, res.statusText, body?.message);
  }
};

export default handleResponse;
