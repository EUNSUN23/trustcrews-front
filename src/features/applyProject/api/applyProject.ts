import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';
import { MY_PROJECT_APPLIES_QUERY_KEY } from '@/features/myProjectApplies/api/getMyProjectApplies';

export const applyProject = async (
  projectId: bigint | number,
  positionId: bigint | number,
): Promise<ResponseBody<null>> => {
  return await request(
    'POST',
    `/api/projectApply/auth?projectId=${projectId}`,
    {
      positionId,
      projectId,
      apply_message: '기본 메세지',
    },
  );
};

type ApplyProjectRes = ApiResult<typeof applyProject>;

export const useApplyProject = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: ApplyProjectRes) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      positionId,
    }: {
      projectId: bigint | number;
      positionId: bigint | number;
    }) => applyProject(projectId, positionId),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [MY_PROJECT_APPLIES_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error);
      onError?.(error);
    },
  });
};
