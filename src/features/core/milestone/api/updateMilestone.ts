import { z } from 'zod';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MILESTONES_QUERY_KEY } from '@/features/core/milestone/api/getMilestones';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const updateMilestoneSchema = z.object({
  content: z.string().nonempty('마일스톤 내용을 입력해 주세요'),
  startDate: z.string().nonempty('시작날짜를 선택해 주세요'),
  endDate: z.string().nonempty('종료날짜를 선택해 주세요'),
});

export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;

export const updateMilestone = async (
  milestoneId: bigint,
  userPMAuth: string,
  data: UpdateMilestoneInput,
): Promise<ResponseBody<null>> => {
  return await request('PATCH', `/api/projectJobs/auth/milestone`, {
    ...data,
    milestoneId,
    userPMAuth,
  });
};

type UpdateMilestoneRes = ApiResult<typeof updateMilestone>;

export const useUpdateMilestone = (
  milestoneId: bigint,
  userPMAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateMilestoneRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMilestoneInput) =>
      updateMilestone(milestoneId, userPMAuth, data),
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
