import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from 'next/link';
import UserMenuContainerSkeleton from '@/features/composite/userMenu/ui/UserMenuContainerSkeleton';
import { IoCreateOutline } from '@react-icons/all-files/io5/IoCreateOutline';
import calcImageSizes from '@/lib/calcImageSizes';
import { UserMenuContainer } from '@/features/composite/userMenu/ui/UserMenuContainer';
import { Suspense } from 'react';
import { checkIsAuthorized } from '@/lib/checkIsAuthorized';

const Header = () => {
  const isAuthorized = checkIsAuthorized();
  return (
    <header className='flex flex-col'>
      <div className='flex items-center justify-between h-[80px] mobile:h-[65px] my-1'>
        <div id='top-navigation-wrap'>
          <Link
            href='/public'
            aria-label='trustcrews 홈페이지'
            className='inline-block relative pc:w-[200px] pc:h-[60px] tablet:w-[150px] tablet:h-[50px] mobile:w-[120px] mobile:h-[40px]'
          >
            <Image
              src={logo}
              alt='trustcrew 대표 이미지'
              aria-hidden='true'
              sizes={calcImageSizes('120px', '150px', '200px')}
              fill
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-30%)',
              }}
              quality={100}
              priority
            />
          </Link>
        </div>
        <div id='top-navigation-main' className='flex items-center'>
          <Link href='/launch'>
            <div
              aria-hidden='true'
              className='mx-4 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
            >
              <span className='mobile:hidden'>새 프로젝트</span>
              <IoCreateOutline className='pc:hidden tablet:hidden h-6 w-6' />
            </div>
          </Link>
          <div>
            {isAuthorized ? (
              <Suspense fallback={<UserMenuContainerSkeleton />}>
                <UserMenuContainer />
              </Suspense>
            ) : (
              <Link
                aria-label='로그인 페이지'
                href='/login'
                className='mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
