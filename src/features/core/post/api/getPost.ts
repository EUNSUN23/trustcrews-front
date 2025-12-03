import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { Post } from '@/entities/post';

export const getPost = async (
  projectId: bigint,
): Promise<ResponseBody<Post>> => {
  return await request(
    'GET',
    `/api/projectConfig/auth/post?projectId=${projectId}`,
  );
};

export const POST_DATA_QUERY_KEY = 'postSummaryData';

export const usePostConfig = (projectId: bigint) => {
  return useSuspenseQuery({
    queryKey: [POST_DATA_QUERY_KEY, bigIntToString(projectId)],
    queryFn: () => getPost(projectId),
  });
};
