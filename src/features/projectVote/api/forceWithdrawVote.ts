import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { FWVOTE_NOTICE_LIST_QUERY_KEY } from '@/features/projectNotice/api/fwVoteNotice/getFWVoteNoticeList';
import { FWVOTE_NOTICE_QUERY_KEY } from '@/features/projectNotice/api/fwVoteNotice/getFWVoteNotice';
import { ApiResult } from '@/shared/types/apiResult';

export type FWVoteBaseParams = {
  projectId: bigint;
  voteId: bigint;
  crewId: bigint;
  crewPMAuth: string;
  userPMAuth: string;
};

export const fWVoteAnswerInputSchema = z.object({
  answer: z.string().nonempty({ message: '찬성 혹은 반대를 선택해주세요.' }),
});

export type FWVoteAnswerInput = z.infer<typeof fWVoteAnswerInputSchema>;

type FWVoteReqParams = FWVoteBaseParams & FWVoteAnswerInput;

export const voteForProjectFWithdraw = async (data: FWVoteReqParams) => {
  return await request('POST', '/api/projectVote/auth/fwithdraw', data);
};

type VoteFWRes = ApiResult<typeof voteForProjectFWithdraw>;

// todo - message 백엔드처리
export const useForceWithdrawVote = (
  baseParams: FWVoteBaseParams,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: VoteFWRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FWVoteAnswerInput) =>
      voteForProjectFWithdraw({ ...baseParams, ...data }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [FWVOTE_NOTICE_LIST_QUERY_KEY],
      });

      await queryClient.invalidateQueries({
        queryKey: [FWVOTE_NOTICE_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
