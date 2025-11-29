import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { MILESTONES_QUERY_KEY } from '@/features/milestone/api/getMilestones';
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqData: CreateMilestoneInput) =>
      createMilestone(projectId, userPMAuth, reqData),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [MILESTONES_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
