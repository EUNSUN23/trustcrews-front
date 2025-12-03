import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const AvatarSkeletonVariants = cva(`bg-gray-300 rounded-full animate-pulse`, {
  variants: {
    size: {
      xxs: 'h-[24px] w-[24px]',
      xs: 'pc:h-[40px] pc:w-[40px] h-[32px] w-[32px]',
      sm: 'pc:h-[64px] pc:w-[64px] h-[40px] w-[40px]',
      md: 'pc:h-[96px] pc:w-[96px] h-[64px] w-[64px]',
      lg: 'pc:h-[160px] pc:w-[160px] h-[112px] w-[112px]',
    },
  },
});

interface AvatarSkeletonProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof AvatarSkeletonVariants> {}

const AvatarSkeleton = ({ size, ...props }: AvatarSkeletonProps) => {
  return (
    <div
      className={cn(AvatarSkeletonVariants({ size }), props.className)}
    ></div>
  );
};

export default AvatarSkeleton;
