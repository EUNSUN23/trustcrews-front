import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { UserProfileInfo } from '@/features/userProfile/api/getUserDetailInfo';
import { ResponseBody } from '@/shared/types/responseBody';
import { VoteData } from '@/types/data/projectDetail/projectVote/projectVote';

export type RCVoteNoticeDetailData = {
  applicantInfo: Omit<UserProfileInfo, 'userId'> & { userId: bigint };
  voteInfo: VoteData & {
    applicant_id: bigint;
  };
};

export const getRCVoteNotice = async (
  noticeId: bigint,
  applyId: bigint,
  voteId: bigint,
): Promise<ResponseBody<RCVoteNoticeDetailData>> => {
  const reqUrl = `/api/projectNotice/auth/rcVote?noticeId=${noticeId}&applyId=${applyId}&voteId=${voteId}`;
  return await request('GET', reqUrl);
};

export const RCVOTE_NOTICE_QUERY_KEY = 'vAlertRecruitDetailData';

export const useRecruitNotice = (
  voteId: bigint,
  applyId: bigint,
  noticeId: bigint,
) => {
  return useSuspenseQuery({
    queryKey: [
      RCVOTE_NOTICE_QUERY_KEY,
      bigIntToString(voteId),
      bigIntToString(applyId),
      bigIntToString(noticeId),
    ],
    queryFn: () => getRCVoteNotice(noticeId, applyId, voteId),
  });
};
