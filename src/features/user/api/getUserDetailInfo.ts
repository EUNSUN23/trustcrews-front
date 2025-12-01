import 'server-only';
import { ResponseBody } from '@/shared/types/responseBody';
import { TrustGradeName } from '@/features/trustGrade/types/trustGrade';
import { Position } from '@/features/position/types/position';
import { TechStack } from '@/features/techStack/types/techStack';
import { requestInServer } from '@/lib/serverApi/requestInServer';

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
  return await requestInServer('GET', `/api/user/profile`);
};
