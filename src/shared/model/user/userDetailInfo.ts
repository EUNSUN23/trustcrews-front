import { TrustGradeName } from '@/shared/model/trustGrade';
import { Position } from '@/shared/model/position';
import { TechStackData } from '@/shared/model/techStack/techStackData';

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
  techStacks: TechStackData[];
  intro?: string;
  projectHistoryTotalCount: number;
  createDate: string;
  updateDate: string;
};
