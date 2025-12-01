import UserMenu from '@/features/auth/userMenu/components/UserMenu';
import { getSimpleUserInfo } from '@/features/auth/userMenu/api/getSimpleUserInfo';

export const UserMenuContainer = async () => {
  const res = await getSimpleUserInfo();
  return <UserMenu data={res.data} />;
};
