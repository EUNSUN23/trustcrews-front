import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const ConfigSummaryLayout = ({
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        'my-6 font-semibold text-2xl mobile:text-lg py-2 border-b-2',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </h1>
  );
};

export default ConfigSummaryLayout;
