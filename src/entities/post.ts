import { Position } from '@/entities/position';

export type Post = {
  postId: bigint;
  title: string;
  content: string;
  recruitmentStatus: boolean;
  contact: string;
  postPositions: {
    postPositionId: bigint | number;
    position: Position;
  }[];
};
