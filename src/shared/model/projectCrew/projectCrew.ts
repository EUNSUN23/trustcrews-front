import { ProjectAuthMap } from '@/shared/model/projectMngAuth/projectAuth';
import { Position } from '@/shared/model/position';

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
};
