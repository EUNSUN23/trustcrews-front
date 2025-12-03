import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { ProjectData } from '@/shared/model/project/projectData';

export const getProjectInfoSummary = async (
  projectId: bigint,
): Promise<ResponseBody<ProjectData>> => {
  return await request('GET', `/api/project/public?projectId=${projectId}`);
};

export const PROJECT_INFO_SUMMARY_QUERY_KEY = 'projectInfoSummary';

export const useProjectSummaryInfo = (projectId: bigint) => {
  return useSuspenseQuery({
    queryKey: [PROJECT_INFO_SUMMARY_QUERY_KEY, bigIntToString(projectId)],
    queryFn: () => getProjectInfoSummary(projectId),
  });
};
