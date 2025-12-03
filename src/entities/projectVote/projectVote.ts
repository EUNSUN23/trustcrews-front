import { VoteStatusType } from '@/entities/projectVote/voteStatus';

export type ProjectVote = {
  voteId: bigint;
  voteStatus: VoteStatusType;
  agrees: number;
  disagrees: number;
  maxVoteCount: number;
};
