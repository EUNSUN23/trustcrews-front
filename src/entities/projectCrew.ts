import { ProjectAuth } from '@/entities/projectAuth';
import { Position } from '@/entities/position';

export type ProjectCrew = {
  crewId: bigint;
  user: {
    userId: bigint;
    email: string;
    nickname: string;
    profileImgSrc: string;
  };
  crewPMAuth: ProjectAuth;
  position: Position;
};
