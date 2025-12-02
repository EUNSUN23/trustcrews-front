import { useSuspenseQuery } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { request } from '@/lib/clientApi/request';
import { TechStack } from '@/features/core/techStack/types/techStack';
import { TrustGradeName } from '@/features/core/trustGrade/types/trustGrade';
import { Position } from '@/features/core/position/types/position';

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
