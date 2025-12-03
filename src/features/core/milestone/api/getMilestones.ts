import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import sortByStartDate from '@/shared/utils/sortByStartDate';
import { MilestoneDataType } from '@/shared/model/milestone/milestoneDataType';

export const getMilestones = async (
  projectId: string,
): Promise<ResponseBody<MilestoneDataType[]>> => {
  const resBody = await request(
    'GET',
    `/api/projectJobs/auth/milestone?projectId=${projectId}`,
  );

  return {
    ...resBody,
    data: resBody.data
      ? sortByStartDate(resBody.data!, 'asc').map((v, index) => ({
          ...v,
          index,
        }))
      : [],
  };
};

export const MILESTONES_QUERY_KEY = 'milestoneList';

export const useMilestones = (projectId: string) => {
  return useSuspenseQuery({
    queryKey: [MILESTONES_QUERY_KEY, projectId],
    queryFn: () => getMilestones(projectId),
  });
};
