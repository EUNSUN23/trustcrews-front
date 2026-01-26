'use client';

import ErrorPageDisplay from '@/lib/error/ErrorPageDisplay';

const ProjectErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <ErrorPageDisplay error={error} reset={reset} />;
};

export default ProjectErrorPage;
