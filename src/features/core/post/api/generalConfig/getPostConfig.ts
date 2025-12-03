import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { PostDataType } from '@/shared/model/post/postDataType';

export const getPostConfig = async (
  projectId: bigint,
): Promise<ResponseBody<PostDataType>> => {
  return await request(
    'GET',
    `/api/projectConfig/auth/post?projectId=${projectId}`,
  );
};

export const POST_CONFIG_QUERY_KEY = 'postConfig';

export const usePostConfig = (projectId: bigint) => {
  return useSuspenseQuery({
    queryKey: [POST_CONFIG_QUERY_KEY, bigIntToString(projectId)],
    queryFn: () => getPostConfig(projectId),
  });
};
