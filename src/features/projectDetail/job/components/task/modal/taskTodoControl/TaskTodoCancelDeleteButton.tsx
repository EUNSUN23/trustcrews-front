'use client';

import { RiDeleteBin6Line } from '@react-icons/all-files/ri/RiDeleteBin6Line';
import { ImCancelCircle } from '@react-icons/all-files/im/ImCancelCircle';
import { HTMLAttributes } from 'react';
import useMobileMediaQuery from '@/hooks/mediaQuery/useMobileMediaQuery';

interface TaskContentCancelDeleteButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  mode: 'cancel' | 'delete';
  disabled: boolean;
}

const TaskTodoCancelDeleteButton = ({
  onClick,
  mode,
  disabled,
  ...props
}: TaskContentCancelDeleteButtonProps) => {
  const isMobile = useMobileMediaQuery();
  const iconSize = isMobile ? 18 : 23;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='disabled:text-gray-600/70'
      {...props}
    >
      {mode === 'delete' ? (
        <RiDeleteBin6Line size={iconSize} />
      ) : (
        <ImCancelCircle size={iconSize} className='text-gray-500' />
      )}
    </button>
  );
};

export default TaskTodoCancelDeleteButton;
