'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from '@react-icons/all-files/io/IoMdArrowRoundBack';

type UserLayoutProps = {
  children: ReactNode;
};

const UserLayout = ({ children }: UserLayoutProps) => {
  const router = useRouter();

  return (
    <section className='flex-col justify-center mx-auto tablet:pt-[1.5rem] px-[5rem] mobile:px-[1.5rem] pb-[1.5rem]'>
      <section className='w-fit cursor-pointer'>
        <IoMdArrowRoundBack
          className='tablet:h-12 tablet:w-12 mobile:h-6 mobile:w-6 text-grey700'
          onClick={() => router.back()}
        />
      </section>
      {children}
    </section>
  );
};

export default UserLayout;
