import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TASKS_QUERY_KEY } from '@/features/task/api/getTaskList';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type TaskDeleteReqData = {
  taskId: bigint;
  userPMAuth: string;
};

export const deleteTask = async (
  data: TaskDeleteReqData,
): Promise<ResponseBody<null>> => {
  return await request('DELETE', '/api/projectJobs/auth/task', data);
};

type DeleteTaskRes = ApiResult<typeof deleteTask>;

export const useDeleteTask = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: DeleteTaskRes) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskDeleteReqData) => deleteTask(data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
