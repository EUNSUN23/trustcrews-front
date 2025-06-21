import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { positionQueryOptions } from '@/features/position/api/getPositionList';
import { techCategoryQueryOptions } from '@/features/techStack/api/getTechStackCategories';
import { techStackMappingsQueryOptions } from '@/features/techStack/api/getTechStackMappings';
import { techListQueryOptions } from '@/features/techStack/api/getTechStackList';

const StaticOptionDataProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(positionQueryOptions());

  queryClient.prefetchQuery(techCategoryQueryOptions());

  queryClient.prefetchQuery(techStackMappingsQueryOptions());

  queryClient.prefetchQuery(techListQueryOptions());

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) => query.state.status === 'pending',
    shouldRedactErrors: () => {
      return false;
    },
  });

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
};

export default StaticOptionDataProvider;
