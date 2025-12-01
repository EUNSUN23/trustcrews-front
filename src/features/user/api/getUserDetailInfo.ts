import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { TrustGradeName } from '@/features/trustGrade/types/trustGrade';
import { Position } from '@/features/position/types/position';
import { TechStack } from '@/features/techStack/types/techStack';
import { request } from '@/lib/clientApi/request';

export type UserDetailInfo = {
  userId: bigint | null;
  email: string;
  nickname: string;
  profileImgSrc?: string | null;
  trustScore: number;
  trustGrade: {
    trustGradeId: number | bigint;
    trustGradeName: TrustGradeName;
  };
  position: Position;
  techStacks: TechStack[];
  intro?: string;
  projectHistoryTotalCount: number;
  createDate: string;
  updateDate: string;
};

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
