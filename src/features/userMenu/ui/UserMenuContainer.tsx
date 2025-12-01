import UserMenu from '@/features/userMenu/ui/UserMenu';
import { getSimpleUserInfo } from '@/features/user/api/getSimpleUserInfo';

export const UserMenuContainer = async () => {
  const res = await getSimpleUserInfo();
  return <UserMenu data={res.data} />;
};
