import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';

const VoteStatusBadgeVariants = cva(
  'inline-flex items-center rounded-full transparent font-medium  ring-1 ring-inset ',
  {
    variants: {
      voteStatus: {
        VSTAT1001: 'bg-green-50 text-green-700 ring-green-600/20',
        VSTAT1002: 'bg-slate-50 text-slate-600 ring-slate-700/20',
      },
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface VoteStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof VoteStatusBadgeVariants> {}

const VoteStatusBadge = ({
  voteStatus,
  size,
  ...props
}: VoteStatusBadgeProps) => {
  return (
    <>
      <span
        {...props}
        className={cn(
          VoteStatusBadgeVariants({ size, voteStatus }),
          props.className,
        )}
      >
        {props.children}
      </span>
    </>
  );
};

export default VoteStatusBadge;
