import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const logout = async (): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/user/logout');
};

type LogOutRes = ApiResult<typeof logout>;

export const useLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: LogOutRes) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
