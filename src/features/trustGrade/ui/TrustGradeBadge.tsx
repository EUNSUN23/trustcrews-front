'use client';

import { HTMLAttributes } from 'react';
import { FaRegSmile } from '@react-icons/all-files/fa/FaRegSmile';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/shared/styles/cn';

const TrustGradeBadgeVariants = cva('font-semibold', {
  variants: {
    trustGrade: {
      level1: 'text-level1',
      level2: 'text-level2',
      level3: 'text-level3',
      level4: 'text-level4',
    },
    size: baseBadgeVariants.size,
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface TrustBradeBadgeProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof TrustGradeBadgeVariants> {
  badgeStyle?: 'emo' | 'text';
}

const TrustGradeBadge = ({
  trustGrade,
  size,
  badgeStyle = 'emo',
  ...props
}: TrustBradeBadgeProps) => {
  let emoBadgeSize = 16;
  switch (size) {
    case 'md':
      emoBadgeSize = 20;
      break;
    case 'lg':
      emoBadgeSize = 24;
      break;
    default:
      break;
  }

  return (
    <>
      <span className='sr-only'>{`신뢰등급: ${trustGrade}`}</span>
      {badgeStyle === 'text' ? (
        <span
          {...props}
          className={cn(
            TrustGradeBadgeVariants({ trustGrade, size }),
            props.className,
          )}
        >
          {trustGrade}
        </span>
      ) : (
        <div
          className={cn(
            TrustGradeBadgeVariants({ trustGrade, size }),
            props.className,
          )}
        >
          <FaRegSmile aria-hidden={true} size={emoBadgeSize} />
        </div>
      )}
    </>
  );
};

export default TrustGradeBadge;
