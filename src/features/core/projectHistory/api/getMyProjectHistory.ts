import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PageResponseBody } from '@/shared/types/responseBody';
import { ProjectHistoryData } from '@/features/core/projectHistory/types/projectHistory';

export const getMyProjectHistory = async (
  pageNumber: number,
): Promise<PageResponseBody<ProjectHistoryData[]>> => {
  return await request(
    'GET',
    `/api/projectHistory/auth/me?pageNumber=${pageNumber}`,
  );
};

export const useMyProjectHistory = (pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: ['myProjectHistory', pageIndex],
    queryFn: () => getMyProjectHistory(pageIndex),
  });
};
