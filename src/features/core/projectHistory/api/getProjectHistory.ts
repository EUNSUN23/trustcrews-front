import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { PageResponseBody } from '@/shared/types/responseBody';
import { ProjectHistoryData } from '@/features/core/projectHistory/types/projectHistory';

export const getProjectHistory = async (
  userId: bigint,
  pageNumber: number,
): Promise<PageResponseBody<ProjectHistoryData[]>> => {
  return await request(
    'GET',
    `/api/projectHistory?pageNumber=${pageNumber}&userId=${userId}`,
  );
};

export const useProjectHistory = (userId: bigint, pageNumber: number) => {
  return useSuspenseQuery({
    queryKey: ['applicantProjectHistory', pageNumber, bigIntToString(userId)],
    queryFn: () => getProjectHistory(userId, pageNumber),
  });
};
