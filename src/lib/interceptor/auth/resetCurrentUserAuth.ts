import 'server-only';
import { COOKIE, deleteCookieValue } from '@/lib/cookie';

const resetCurrentUserAuth = () => {
  deleteCookieValue(COOKIE.ACS_TOKEN);
  deleteCookieValue(COOKIE.REF_TOKEN);
  deleteCookieValue(COOKIE.USER_ID);
};

export default resetCurrentUserAuth;
