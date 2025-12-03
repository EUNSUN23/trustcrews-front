import { TrustGradeName } from '@/entities/trustGrade';
import { Position } from '@/entities/position';
import { TechStackData } from '@/entities/techStack';

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
