import { HeaderLogo } from '@/app/_components/header/HeaderLogo';
import HeaderNavigation from '@/app/_components/header/header-navigation/HeaderNavigation';

export const Header = () => {
  return (
    <header className='flex flex-col'>
      <div className='flex items-center justify-between h-[80px] mobile:h-[65px] my-1'>
        <div id='top-navigation-wrap'>
          <HeaderLogo />
        </div>
        <div id='top-navigation-main' className='flex items-center'>
          <HeaderNavigation />
        </div>
      </div>
    </header>
  );
};
