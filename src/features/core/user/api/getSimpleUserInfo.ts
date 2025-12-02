import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';

export interface SimpleUserInfo {
  nickname: string;
  profileImgSrc: string;
}

export const getSimpleUserInfo = async (): Promise<
  ResponseBody<SimpleUserInfo>
> => {
  return await request('GET', '/api/user');
};

export const SIMPLE_USER_INFO_QUERY_KEY = 'simpleUserInfo';

export const useSimpleUserInfo = () => {
  return useSuspenseQuery({
    queryKey: [SIMPLE_USER_INFO_QUERY_KEY],
    queryFn: getSimpleUserInfo,
  });
};
