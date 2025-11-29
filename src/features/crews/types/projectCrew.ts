import { ProjectAuthMap } from '@/features/projectMngAuth/types/projectAuth';
import { Position } from '@/features/position/types/position';

export type ProjectCrew = {
  crewId: bigint;
  user: {
    userId: bigint;
    email: string;
    nickname: string;
    profileImgSrc: string;
  };
  crewPMAuth: ProjectAuthMap;
  position: Position;
  lastWorkDate: string;
};
