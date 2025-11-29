import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';
import { HTMLAttributes } from 'react';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { NoticeType } from '@/types/data/projectDetail/notice/noticeType';

const NoticeBadgeVariants = cva(
  'inline-flex items-center rounded-full font-medium ring-1 ring-inset',
  {
    variants: {
      noticeType: {
        PRA2001: 'bg-blue-50 text-blue-700 ring-blue-700/10',
        PRA1002: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
        PRA1003: 'bg-red-50 text-red-700 ring-red-600/10',
      },
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface NoticeBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof NoticeBadgeVariants> {
  noticeType: NoticeType['code'];
}

const NoticeBadge = ({ noticeType, size, ...props }: NoticeBadgeProps) => {
  return (
    <>
      <span
        {...props}
        className={cn(
          NoticeBadgeVariants({ size, noticeType }),
          props.className,
        )}
      >
        {props.children}
      </span>
    </>
  );
};

export default NoticeBadge;
