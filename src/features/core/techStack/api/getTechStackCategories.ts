import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { TechStackCategory } from '@/shared/model/techStack/techStackCategoryData';

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
