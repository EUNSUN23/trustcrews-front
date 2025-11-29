import cn from '@/shared/styles/cn';
import { HTMLAttributes } from 'react';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { cva, VariantProps } from 'class-variance-authority';
import { TaskStatusCode } from '@/types/data/projectDetail/job/task';

const TaskStatusBadgeVariants = cva(
  'inline-flex items-center rounded-full font-medium',
  {
    variants: {
      taskStatus: {
        PS001: 'bg-grey900 text-grey000',
        PS002: 'bg-[#FFF9CF] text-[#7B5C03]',
        PS003: 'bg-[#F1F1F1] text-[#242D35]',
      },
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface TaskStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof TaskStatusBadgeVariants> {
  taskStatus: TaskStatusCode;
}

const TaskStatusBadge = ({
  taskStatus,
  size,
  ...props
}: TaskStatusBadgeProps) => {
  return (
    <span
      className={cn(
        TaskStatusBadgeVariants({ size, taskStatus }),
        props.className,
      )}
    >
      {props.children}
    </span>
  );
};

export default TaskStatusBadge;
