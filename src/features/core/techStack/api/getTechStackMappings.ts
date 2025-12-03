import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { TechStackMappingData } from '@/entities/techStack';

export const getTechStackMappings = async (): Promise<
  ResponseBody<TechStackMappingData[]>
> => {
  return await request('GET', '/api/techStack/mapping');
};

export const techStackMappingsQueryOptions = () => {
  return queryOptions({
    queryKey: ['techStackListWithCategory'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackMappings,
  });
};
export const useTechStackMappings = () => {
  return useSuspenseQuery(techStackMappingsQueryOptions());
};
