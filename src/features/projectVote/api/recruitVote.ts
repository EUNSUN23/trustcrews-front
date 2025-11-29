import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { RC_VOTE_NOTICE_LIST_QUERY_KEY } from '@/features/projectNotice/api/rcVoteNotice/getRCVoteNoticeList';
import { RCVOTE_NOTICE_QUERY_KEY } from '@/features/projectNotice/api/rcVoteNotice/getRCVoteNotice';
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RecruitVoteAnswerInput) =>
      recruitVote({ ...baseParams, ...data }),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: [RC_VOTE_NOTICE_LIST_QUERY_KEY],
        });
        await queryClient.invalidateQueries({
          queryKey: [RCVOTE_NOTICE_QUERY_KEY],
        });
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
