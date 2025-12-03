import { Position } from '@/shared/model/position';

export type PostDataType = {
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
