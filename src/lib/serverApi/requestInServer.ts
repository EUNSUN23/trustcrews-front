import 'server-only';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import { JSONReplaceBigInt } from '@/shared/utils/jsonUtils';
import NEXT_PUBLIC_URL from '@/constants/api/nextPublicUrl';
import response from '@/lib/clientApi/response';
import { cookies } from 'next/headers';

export const requestInServer = async (
  method: HTTP_METHOD,
  url: string,
  data?: Record<string, unknown>,
) => {
  const headers = {
    'Content-Type': 'application/json',
    cookie: cookies().toString(),
  };

  const requestInit: RequestInit = {
    headers,
    method,
  };
  if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

  const res = await fetch(`${NEXT_PUBLIC_URL}${url}`, requestInit);
  return await response(res);
};
