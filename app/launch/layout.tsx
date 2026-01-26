import Nav from '@/shared/ui/Nav';
import { ReactNode } from 'react';

type LaunchLayoutLayoutProps = {
  children: ReactNode;
};

const LaunchLayout = ({ children }: LaunchLayoutLayoutProps) => {
  return (
    <div className='w-full h-full flex flex-col justify-center mx-auto tablet:pt-[1.5rem] px-[2rem] tablet:px-[3rem] mobile:px-[0.5rem] pb-[1rem]'>
      <nav className='w-fit pc:h-[100px] h-[60px] flex flex-col justify-center cursor-pointer'>
        <Nav to='/' />
      </nav>
      {children}
    </div>
  );
};

export default LaunchLayout;
