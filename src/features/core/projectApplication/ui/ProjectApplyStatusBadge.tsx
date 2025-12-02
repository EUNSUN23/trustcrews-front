import cn from '@/shared/styles/cn';
import { HTMLAttributes } from 'react';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { cva, VariantProps } from 'class-variance-authority';

const ProjectApplyStatusBadgeVariants = cva(
  'mr-2 inline-flex items-center rounded-md font-medium ring-1 ring-inset',
  {
    variants: {
      applyStatus: {
        PAS1001: 'bg-gray-50 ring-gray-500/10 text-gray-600',
        PAS1002: 'bg-green-50 ring-green-600/20 text-green-700',
        PAS1003: 'bg-yellow-50 ring-yellow-600/20 text-yellow-800',
      },
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface ProjectApplyStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ProjectApplyStatusBadgeVariants> {}

export const ProjectApplyStatusBadge = ({
  applyStatus,
  size,
  ...props
}: ProjectApplyStatusBadgeProps) => {
  return (
    <span
      {...props}
      className={cn(ProjectApplyStatusBadgeVariants({ applyStatus, size }))}
      aria-hidden={true}
    >
      {props.children}
    </span>
  );
};
