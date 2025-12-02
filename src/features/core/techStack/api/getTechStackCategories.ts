import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export type TechStackCategory = {
  techStackCategoryId: bigint;
  techStackCategoryName: string;
};

export const getTechStackCategories = async (): Promise<
  ResponseBody<TechStackCategory[]>
> => {
  return await request('GET', '/api/techStack/category');
};

export const techCategoryQueryOptions = () => {
  return queryOptions({
    queryKey: ['techStackCategories'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: getTechStackCategories,
  });
};

export const useTechCategories = () => {
  return useSuspenseQuery(techCategoryQueryOptions());
};
