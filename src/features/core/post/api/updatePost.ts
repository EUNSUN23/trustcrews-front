import { request } from '@/lib/clientApi/request';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const updatePostInputSchema = z.object({
  title: z.string().nonempty({ message: '게시글 제목을 입력해주세요.' }),
  content: z.string().nonempty({ message: '게시글 내용을 입력해주세요.' }),
  recruitmentStatus: z.boolean(),
  contact: z.string().nonempty({ message: '연락처를 입력해주세요.' }),
  positionIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '모집 포지션을 선택해주세요.' })
    .readonly(),
});

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;

export const updatePost = async (
  projectId: bigint,
  userPMAuth: string,
  data: UpdatePostInput,
): Promise<ResponseBody<null>> => {
  return await request('PUT', '/api/projectConfig/auth/post', {
    ...data,
    userPMAuth,
    projectId,
  });
};

type UpdatePostInfoRes = ApiResult<typeof updatePost>;

// todo - 백엔드 성공 메세지
export const useUpdatePost = (
  projectId: bigint,
  userPMAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdatePostInfoRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useMutation({
    mutationFn: (data: UpdatePostInput) =>
      updatePost(projectId, userPMAuth, data),
    onSuccess: async (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
