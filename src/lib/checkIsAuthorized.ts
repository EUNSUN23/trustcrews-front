import 'server-only';
import { COOKIE, getCookieValue } from '@/lib/cookie';

export const checkIsAuthorized = () => {
  return (
    !!getCookieValue(COOKIE.ACS_TOKEN) && !!getCookieValue(COOKIE.REF_TOKEN)
  );
};
