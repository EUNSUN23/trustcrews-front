import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode, Suspense } from 'react';
import { ErrorBoundaryPropsWithRender } from 'react-error-boundary/dist/declarations/src/types';
import { HttpError } from '@/shared/utils/HttpError';
import { HttpStatusCode } from 'axios';

interface SuspenseQueryErrorBoundaryProps extends ErrorBoundaryPropsWithRender {
  suspenseFallback: ReactNode;
  children: ReactNode;
  reset: () => void;
  isThrowingAllowed?: boolean;
}

const ComposedBoundary = ({
  suspenseFallback,
  children,
  fallbackRender,
  reset,
  isThrowingAllowed = true,
}: SuspenseQueryErrorBoundaryProps) => {
  const willThrowError = (error: unknown) => {
    return (
      isThrowingAllowed &&
      error instanceof HttpError &&
      (error.status === HttpStatusCode.ServiceUnavailable ||
        error.status === HttpStatusCode.Unauthorized)
    );
  };

  return (
    <ErrorBoundary
      onError={(error: unknown) => {
        // todo - Sentry 로깅만 하고 콘솔 출력을 생략
        // Sentry.captureException(error);
        console.error((error as Error).cause);
        if (
          error instanceof HttpError &&
          error.status === HttpStatusCode.Unauthorized
        )
          if (willThrowError(error)) throw error;
      }}
      onReset={reset}
      fallbackRender={fallbackRender}
    >
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ComposedBoundary;
