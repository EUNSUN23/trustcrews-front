import { request } from '@/lib/clientApi/request';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const createPostInputSchema = z.object({
  title: z.string().nonempty({ message: '게시글 제목을 입력해 주세요.' }),
  content: z.string().nonempty({ message: '게시글 내용을 입력해 주세요.' }),
  contact: z.string().nonempty({ message: '연락처를 입력해 주세요.' }),
  positionIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '모집 포지션을 선택해 주세요.' })
    .readonly(),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

export const createPost = async (
  projectId: bigint,
  data: CreatePostInput,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/post/auth`, { ...data, projectId });
};

export type CreatePostRes = ApiResult<typeof createPost>;

export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: bigint;
      data: CreatePostInput;
    }) => createPost(projectId, data),
  });
};
