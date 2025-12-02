import { request } from '@/lib/clientApi/request';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST_DETAIL_QUERY_KEY } from '@/features/core/post/api/getPostDetail';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';
import { POST_CONFIG_QUERY_KEY } from '@/features/core/post/api/generalConfig/getPostConfig';

export const updatePostConfigInputSchema = z.object({
  title: z.string().nonempty({ message: '게시글 제목을 입력해주세요.' }),
  content: z.string().nonempty({ message: '게시글 내용을 입력해주세요.' }),
  recruitmentStatus: z.boolean(),
  contact: z.string().nonempty({ message: '연락처를 입력해주세요.' }),
  positionIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '모집 포지션을 선택해주세요.' })
    .readonly(),
});

export type UpdatePostConfigInput = z.infer<typeof updatePostConfigInputSchema>;

export const updatePostConfig = async (
  projectId: bigint,
  userPMAuth: string,
  data: UpdatePostConfigInput,
): Promise<ResponseBody<null>> => {
  return await request('PUT', '/api/projectConfig/auth/post', {
    ...data,
    userPMAuth,
    projectId,
  });
};

type UpdatePostInfoRes = ApiResult<typeof updatePostConfig>;

// todo - 백엔드 성공 메세지
export const useUpdatePostConfig = (
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostConfigInput) =>
      updatePostConfig(projectId, userPMAuth, data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [POST_CONFIG_QUERY_KEY, POST_DETAIL_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
