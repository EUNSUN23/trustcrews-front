import UserMenu from '@/features/composite/userMenu/ui/UserMenu';
import { getSimpleUserInfo } from '@/features/core/user/api/getSimpleUserInfo';

export const UserMenuContainer = async () => {
  const res = await getSimpleUserInfo();
  return <UserMenu data={res.data} />;
};
