import { IoCreateOutline } from '@react-icons/all-files/io5/IoCreateOutline';
import Link from 'next/link';

export const LaunchProjectNavigation = () => {
  return (
    <Link href='/launch'>
      <div
        aria-hidden='true'
        className='mx-4 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
      >
        <span className='mobile:hidden'>새 프로젝트</span>
        <IoCreateOutline className='pc:hidden tablet:hidden h-6 w-6' />
      </div>
    </Link>
  );
};
