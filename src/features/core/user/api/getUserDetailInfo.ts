import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { UserDetailInfo } from '@/shared/model/user/userDetailInfo';

export const getUserDetailInfo = async (): Promise<
  ResponseBody<UserDetailInfo>
> => {
  return await request('GET', `/api/user/profile`);
};

export const USER_DETAIL_INFO_QUERY_KEY = 'profileInfo';

export const useUserDetailInfo = () => {
  return useSuspenseQuery({
    queryKey: [USER_DETAIL_INFO_QUERY_KEY],
    queryFn: getUserDetailInfo,
  });
};
