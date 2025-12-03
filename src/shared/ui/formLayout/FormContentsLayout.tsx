import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const FormContentsLayout = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'w-full mx-auto grid pc:grid-cols-2 tablet:grid-cols-1 gap-10 place-content-between',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default FormContentsLayout;
