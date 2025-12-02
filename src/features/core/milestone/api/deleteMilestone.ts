import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MILESTONES_QUERY_KEY } from '@/features/core/milestone/api/getMilestones';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type DeleteMilestoneReqData = {
  milestoneId: bigint;
  projectId: bigint;
  userPMAuth: string;
};

export const deleteMilestone = async (
  reqData: DeleteMilestoneReqData,
): Promise<ResponseBody<null>> => {
  return await request('DELETE', `/api/projectJobs/auth/milestone`, reqData);
};

type DeleteMilestoneRes = ApiResult<typeof deleteMilestone>;

export const useDeleteMilestone = (
  projectId: bigint,
  userPMAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: DeleteMilestoneRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mileStoneId: bigint) =>
      deleteMilestone({
        projectId: projectId,
        milestoneId: mileStoneId,
        userPMAuth,
      }),
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
