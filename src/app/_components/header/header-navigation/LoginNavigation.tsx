import Link from 'next/link';

export const LoginNavigation = () => {
  return (
    <Link
      aria-label='로그인 페이지'
      href='/login'
      className='mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
    >
      로그인
    </Link>
  );
};
