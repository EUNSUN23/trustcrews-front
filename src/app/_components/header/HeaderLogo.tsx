import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import calcImageSizes from '@/shared/utils/calcImageSizes';
import Link from 'next/link';

export const HeaderLogo = () => {
  return (
    <Link
      href='/'
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
  );
};
