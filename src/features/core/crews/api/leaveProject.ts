import { request } from '@/lib/clientApi/request';
import { ProjectAuthCode } from '@/shared/model/projectMngAuth/projectAuth';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type LeaveProjectInput = {
  projectId: bigint;
  crewId: bigint;
  crewPMAuth: ProjectAuthCode;
};

export const leaveProject = async (
  reqData: LeaveProjectInput,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/project/auth/leave`, reqData);
};

type LeaveProjectRes = ApiResult<typeof leaveProject>;

// todo - 백엔드 성공 메세지
export const useLeaveProject = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: LeaveProjectRes) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (data: LeaveProjectInput) => leaveProject(data),
    onSuccess: async (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
