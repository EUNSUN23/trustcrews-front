import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const createMilestoneInputSchema = z.object({
  startDate: z.string().min(1, { message: '마일스톤 내용을 입력해 주세요' }),
  endDate: z.string().min(1, { message: '시작날짜를 선택해 주세요' }),
  content: z.string().min(1, { message: '종료날짜를 선택해 주세요' }),
});

export type CreateMilestoneInput = z.infer<typeof createMilestoneInputSchema>;

export const createMilestone = async (
  projectId: bigint,
  userPMAuth: string,
  reqData: CreateMilestoneInput,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/projectJobs/auth/milestone`, {
    ...reqData,
    projectId,
    userPMAuth,
  });
};

type CreateMilestoneRes = ApiResult<typeof createMilestone>;

export const useCreateMilestone = (
  projectId: bigint,
  userPMAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: CreateMilestoneRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useMutation({
    mutationFn: (reqData: CreateMilestoneInput) =>
      createMilestone(projectId, userPMAuth, reqData),
    onSuccess: async (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
