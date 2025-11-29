import { HTMLAttributes } from 'react';
import cn from '@/shared/styles/cn';

const ConfigLayout = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <section
      className={cn(
        'max-w-[1100px] space-y-10 px-8 mobile:px-4',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </section>
  );
};

export default ConfigLayout;
