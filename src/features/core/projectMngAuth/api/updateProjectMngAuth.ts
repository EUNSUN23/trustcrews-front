import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const updateProjectMngAuthInputSchema = z.object({
  crewPMAuth: z
    .string()
    .nonempty({ message: '프로젝트 권한을 선택해 주세요.' }),
});

export type UpdateProjectMngAuthInput = z.infer<
  typeof updateProjectMngAuthInputSchema
>;

export const updateProjectMngAuth = async (
  projectId: bigint,
  crewId: bigint,
  userPMAuth: string,
  data: UpdateProjectMngAuthInput,
): Promise<ResponseBody<null>> => {
  return request('PUT', '/api/projectConfig/auth/pmAuth', {
    ...data,
    projectId,
    crewId,
    userPMAuth,
  });
};

type UpdateProjectMngAuthRes = ApiResult<typeof updateProjectMngAuth>;

export const useUpdatePMAuthConfig = (
  projectId: bigint,
  crewId: bigint,
  userPMAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateProjectMngAuthRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useMutation({
    mutationFn: (data: UpdateProjectMngAuthInput) =>
      updateProjectMngAuth(projectId, crewId, userPMAuth, data),
    onSuccess: (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
