import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/shared/types/responseBody';
import { PostDataType } from '@/shared/model/post/postDataType';

export type PostDetailData = PostDataType & {
  projectId: bigint;
  user: {
    userId: bigint;
    nickName: string;
    userProfileImgSrc: string | null;
  };
  createDate: string;
  updateDate: string;
};

export const getPostDetail = async (
  postId: bigint,
): Promise<ResponseBody<PostDetailData>> => {
  return await request('GET', `/api/post/public?postId=${postId}`);
};

export const POST_DETAIL_QUERY_KEY = 'postDetailInfo';

export const usePostDetail = (postId: bigint) => {
  return useSuspenseQuery({
    queryKey: [POST_DETAIL_QUERY_KEY, bigIntToString(postId)],
    queryFn: () => getPostDetail(postId),
  });
};
