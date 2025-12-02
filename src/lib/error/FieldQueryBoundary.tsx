import ComposedBoundary from '@/lib/error/ComposedBoundary';
import { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import cn from '@/shared/styles/cn';
import { CgRedo } from '@react-icons/all-files/cg/CgRedo';
import { cva, VariantProps } from 'class-variance-authority';
import { HttpError } from '@/lib/error/HttpError';
import { HttpStatusCode } from 'axios';

const QueryErrorMessageVariants = cva(
  'flex flex-wrap items-center  space-x-3 text-gray-500',
  {
    variants: {
      errorFallbackSize: {
        lg: 'mx-auto my-[100px] mobile:my-[30px] justify-center w-[640px] mobile:w-[330px] text-3xl font-semibold mobile:text-xl mobile:font-medium leading-loose',
        md: 'my-4 mobile:my-2 justify-center min-w-[500px] mobile:min-w-[300px] text-[22px] tablet:font-medium mobile:text-xl',
        sm: 'justify-start w-full mobile:text-sm',
      },
    },
    defaultVariants: {
      errorFallbackSize: 'sm',
    },
  },
);

interface SuspenseFieldQueryBoundaryProps
  extends VariantProps<typeof QueryErrorMessageVariants>,
    VariantProps<typeof QueryRetryIconVariants> {
  suspenseFallback: ReactNode;
  children: ReactNode;
  className?: string;
  isThrowingAllowed?: boolean;
}

const QueryRetryIconVariants = cva(
  'text-primary shadow-md rounded-xl border border-gray-100',
  {
    variants: {
      errorFallbackSize: {
        lg: 'size-12 mobile:size-8',
        md: 'size-9 mobile:size-7',
        sm: 'size-7 mobile:size-5',
      },
    },
    defaultVariants: {
      errorFallbackSize: 'sm',
    },
  },
);

const FieldQueryBoundary = ({
  suspenseFallback,
  children,
  className,
  errorFallbackSize,
  isThrowingAllowed = true,
}: SuspenseFieldQueryBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  const isRetryableError = (error: unknown) => {
    return (
      error instanceof HttpError &&
      error.status !== HttpStatusCode.ServiceUnavailable &&
      error.status !== HttpStatusCode.Unauthorized &&
      error.status !== HttpStatusCode.Forbidden
    );
  };

  return (
    <ComposedBoundary
      isThrowingAllowed={isThrowingAllowed}
      suspenseFallback={suspenseFallback}
      reset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div
          role='alert'
          className={cn(
            QueryErrorMessageVariants({ errorFallbackSize }),
            className,
          )}
        >
          <p>{error.message}</p>
          {isRetryableError(error) && (
            <button title='재시도' onClick={resetErrorBoundary}>
              <span className='sr-only'>재시도</span>
              <CgRedo
                aria-hidden={true}
                className={QueryRetryIconVariants({ errorFallbackSize })}
              />
            </button>
          )}
        </div>
      )}
    >
      {children}
    </ComposedBoundary>
  );
};

export default FieldQueryBoundary;
