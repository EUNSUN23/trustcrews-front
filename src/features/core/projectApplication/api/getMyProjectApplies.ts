import { request } from '@/lib/clientApi/request';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ITEM_COUNT_PER_PAGE } from '@/shared/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';
import { ProjectApplyDataType } from '@/shared/model/projectApplication/projectApplyDataType';

export const getMyProjectApplies = async (
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<ProjectApplyDataType[]>> => {
  return await request(
    'GET',
    `/api/projectApply/auth?pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const MY_PROJECT_APPLIES_QUERY_KEY = 'myProjectApplies';

export const useMyProjectApplies = () => {
  return useSuspenseInfiniteQuery({
    queryKey: [MY_PROJECT_APPLIES_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      getMyProjectApplies(pageParam, ITEM_COUNT_PER_PAGE.LIST_SM),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      if (
        !lastPage.data ||
        nextPage * ITEM_COUNT_PER_PAGE.LIST_SM > lastPage.data.totalPages
      ) {
        return null;
      }

      return nextPage;
    },
  });
};
