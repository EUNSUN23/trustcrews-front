import 'server-only';
import { ResponseBody } from '@/shared/types/responseBody';
import { requestInServer } from '@/lib/serverApi/requestInServer';

export interface SimpleUserInfo {
  nickname: string;
  profileImgSrc: string;
}

export const getSimpleUserInfo = async (): Promise<
  ResponseBody<SimpleUserInfo>
> => {
  return await requestInServer('GET', '/api/user');
};
