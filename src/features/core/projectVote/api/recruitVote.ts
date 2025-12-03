import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ApiResult } from '@/shared/types/apiResult';

export type RecruitVoteBaseParams = {
  voteId: bigint;
  applyId: bigint;
  userPMAuth: string;
};

export const recruitVoteAnswerInputSchema = z.object({
  answer: z.string().nonempty({ message: '찬성 혹은 반대를 선택해주세요.' }),
});

type RecruitVoteAnswerInput = z.infer<typeof recruitVoteAnswerInputSchema>;

type VoteRecruitReqParams = RecruitVoteBaseParams & RecruitVoteAnswerInput;

export const recruitVote = async (data: VoteRecruitReqParams) => {
  return await request('POST', '/api/projectVote/auth/recruit', data);
};

type VoteRecruitRes = ApiResult<typeof recruitVote>;

export const useRecruitVote = (
  baseParams: RecruitVoteBaseParams,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: VoteRecruitRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useMutation({
    mutationFn: (data: RecruitVoteAnswerInput) =>
      recruitVote({ ...baseParams, ...data }),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        onSuccess?.(res);
      } else {
        onError?.(res);
      }
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
