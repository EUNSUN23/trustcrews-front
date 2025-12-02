import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { request } from '@/lib/clientApi/request';
import { PROJECT_INFO_SUMMARY_QUERY_KEY } from '@/features/core/project/api/getProjectInfoSummary';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const updateProjectInfoInputSchema = z.object({
  projectName: z
    .string()
    .nonempty({ message: '프로젝트 이름을 입력해주세요.' }),
  projectSubject: z
    .string()
    .nonempty({ message: '프로젝트 주제를 입력해주세요' }),
  startDate: z
    .string()
    .nonempty({ message: '프로젝트 시작 날짜를 입력해주세요' }),
  endDate: z
    .string()
    .nonempty({ message: '프로젝트 종료 날짜를 입력해주세요' }),
  technologyIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '프로젝트 기술 스택을 선택해주세요.' })
    .readonly(),
});

export type UpdateProjectInfoInput = z.infer<
  typeof updateProjectInfoInputSchema
>;

export const updateProjectInfo = async (
  projectId: bigint,
  userPMAuth: string,
  data: UpdateProjectInfoInput,
): Promise<ResponseBody<null>> => {
  return await request('PUT', '/api/projectConfig/auth/project', {
    ...data,
    projectId,
    userPMAuth,
  });
};

type UpdateProjectInfoRes = ApiResult<typeof updateProjectInfo>;

// todo - 백엔드 성공 메세지
export const useUpdateProjectInfo = (
  projectId: bigint,
  userPMAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateProjectInfoRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectInfoInput) =>
      updateProjectInfo(projectId, userPMAuth, data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [PROJECT_INFO_SUMMARY_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
