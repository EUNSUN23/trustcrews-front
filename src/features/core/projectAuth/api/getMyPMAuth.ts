import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectAuth } from '@/entities/projectAuth';
import { ResponseBody } from '@/shared/types/responseBody';

export const getMyPMAuth = async (
  projectId: string | bigint,
): Promise<ResponseBody<ProjectAuth>> => {
  const _projectId =
    typeof projectId === 'string' ? BigInt(projectId) : projectId;

  return await request(
    'GET',
    `/api/projectConfig/auth/pmAuth?projectId=${_projectId}`,
  );
};

export const getProjectManageAuthQueryKey = (
  projectId: string | bigint | null,
) => {
  return ['currentUserProjectAuth', projectId];
};

export const useMyPMAuth = (projectId: string | bigint | null) => {
  return useSuspenseQuery({
    queryKey: getProjectManageAuthQueryKey(projectId),
    queryFn: () => getMyPMAuth(projectId!),
  });
};
