import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/shared/types/responseBody';
import { TechStack } from '@/types/data/techStack';
import { request } from '@/lib/clientApi/request';

export type ProjectConfigData = {
  projectId: bigint;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyStacks: TechStack[];
};

export const getProjectConfig = async (
  projectId: bigint,
): Promise<ResponseBody<ProjectConfigData>> => {
  return await request(
    'GET',
    `/api/projectConfig/auth/project?projectId=${projectId}`,
  );
};

export const PROJECT_CONFIG_QUERY_KEY = 'projectConfig';

export const useProjectConfig = (projectId: bigint) => {
  return useSuspenseQuery({
    queryKey: [PROJECT_CONFIG_QUERY_KEY, bigIntToString(projectId)],
    queryFn: () => getProjectConfig(projectId),
  });
};
