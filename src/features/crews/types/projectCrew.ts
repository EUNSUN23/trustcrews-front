import { ProjectAuthMap } from '@/features/projectMngAuth/types/projectAuth';
import { Position } from '@/types/data/position';

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
