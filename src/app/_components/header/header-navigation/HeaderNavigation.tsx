import { LaunchProjectNavigation } from '@/app/_components/header/header-navigation/LaunchProjectNavigation';
import { AuthArea } from '@/app/_components/header/header-navigation/AuthArea';

const HeaderNavigation = () => {
  return (
    <>
      <LaunchProjectNavigation />
      <AuthArea />
    </>
  );
};

export default HeaderNavigation;
