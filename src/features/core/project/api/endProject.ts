import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const endProject = async (
  projectId: bigint,
): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/project/auth/end', { projectId });
};

type EndProjectRes = ApiResult<typeof endProject>;

// todo - 백엔드 성공 메세지
export const useEndProject = (
  projectId: bigint,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: EndProjectRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useMutation({
    mutationFn: () => endProject(projectId),
    onSuccess: (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
