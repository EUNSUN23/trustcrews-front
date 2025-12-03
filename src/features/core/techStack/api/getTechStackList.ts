import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { TechStackData } from '@/entities/techStack';

export const getTechStackList = async (): Promise<
  ResponseBody<TechStackData[]>
> => {
  return await request('GET', '/api/techStack');
};

export const TECH_LIST_QUERY_KEY = 'techStacks';

export const techListQueryOptions = () => {
  return queryOptions({
    queryKey: [TECH_LIST_QUERY_KEY],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackList,
  });
};

export const useTechStackList = () => {
  return useSuspenseQuery(techListQueryOptions());
};
