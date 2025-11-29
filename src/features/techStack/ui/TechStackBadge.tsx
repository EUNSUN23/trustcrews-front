'use client';

import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';

const TechStackBadgeVariants = cva(
  'inline-flex items-center rounded-full bg-primary text-white font-medium',
  {
    variants: {
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface TechStackBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof TechStackBadgeVariants> {
  text: string;
}

const TechStackBadge = ({ text, size, ...props }: TechStackBadgeProps) => {
  return (
    <span
      {...props}
      className={cn(TechStackBadgeVariants({ size }), props.className)}
    >
      {text}
    </span>
  );
};

export default TechStackBadge;
