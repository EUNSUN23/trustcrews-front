import 'server-only';
import { cookies } from 'next/headers';

export const COOKIE = {
  ACS_TOKEN: 'Access',
  REF_TOKEN: 'Refresh',
  USER_ID: 'user_id',
} as const;

type CookieName =
  | typeof COOKIE.ACS_TOKEN
  | typeof COOKIE.REF_TOKEN
  | typeof COOKIE.USER_ID;

export const getCookieValue = (cookieName: CookieName) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);
  return cookie?.value || '';
};

export const deleteCookieValue = (cookieName: CookieName) => {
  const cookieStore = cookies();
  cookieStore.delete(cookieName);
};
