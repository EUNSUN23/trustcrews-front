'use client';

import Image, { ImageProps } from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';
import calcImageSizes from '@/lib/calcImageSizes';
import { ApplicationError } from '@/shared/utils/ApplicationError';
import placeholderDataUrl from '@/constants/placeholderDataUrl';

const AvatarVariants = cva(
  `relative inline-block rounded-full ring-2 ring-white`,
  {
    variants: {
      size: {
        xxs: 'h-[24px] w-[24px]',
        xs: 'pc:h-[40px] pc:w-[40px] h-[32px] w-[32px]',
        sm: 'pc:h-[64px] pc:w-[64px] h-[40px] w-[40px]',
        md: 'pc:h-[96px] pc:w-[96px] h-[64px] w-[64px]',
        lg: 'pc:h-[160px] pc:w-[160px] h-[112px] w-[112px]',
      },
    },
  },
);

interface AvatarProps extends ImageProps, VariantProps<typeof AvatarVariants> {
  alt: string;
  src: string;
}

const Avatar = ({ src, size, alt, ...props }: AvatarProps) => {
  let expectedSize;
  switch (size) {
    case 'xxs':
      expectedSize = calcImageSizes('24px', '24px', '24px');
      break;
    case 'xs':
      expectedSize = calcImageSizes('32px', '32px', '40px');
      break;
    case 'sm':
      expectedSize = calcImageSizes('40px', '40px', '64px');
      break;
    case 'md':
      expectedSize = calcImageSizes('64px', '64px', '96px');
      break;
    case 'lg':
      expectedSize = calcImageSizes('112px', '112px', '160px');
      break;
    default:
      throw new ApplicationError(`Unknown Avatar Size: ${size}`);
  }

  return (
    <>
      {src ? (
        <div
          aria-hidden='true'
          className={cn(AvatarVariants({ size }), props.className)}
        >
          <Image
            aria-hidden={true}
            src={src}
            alt={alt}
            fill
            sizes={expectedSize}
            style={{
              objectFit: 'cover',
            }}
            className={cn('rounded-full', props.className)}
            loading={props.loading}
            placeholder={placeholderDataUrl}
          />
        </div>
      ) : (
        <div
          aria-hidden='true'
          className={cn(
            AvatarVariants({ size }),
            props.className,
            'bg-gray-100',
          )}
        >
          <svg
            role='img'
            className={`w-full h-full text-gray-300 rounded-full`}
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
          </svg>
        </div>
      )}
    </>
  );
};

export default Avatar;
