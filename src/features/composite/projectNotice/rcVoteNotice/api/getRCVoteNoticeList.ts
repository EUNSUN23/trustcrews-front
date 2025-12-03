import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/shared/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';
import { PROJECT_NOTICE_TYPES } from '@/entities/projectNoticeType';
import { VoteStatusType } from '@/entities/projectVote/voteStatus';

export type RCVoteNoticeData = {
  noticeId: bigint;
  voteId: bigint;
  applyId: bigint;
  noticeType: typeof PROJECT_NOTICE_TYPES.PRA1002;
  contents: string;
  voteStatus: VoteStatusType;
  createDate: string;
};

export const getRCVoteNoticeList = async (
  projectId: bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<RCVoteNoticeData[]>> => {
  return request(
    'GET',
    `/api/projectNotice/auth/rcVote/list?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const RC_VOTE_NOTICE_LIST_QUERY_KEY = 'rcVoteNoticeList';

export const useRCVoteNoticeList = (projectId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: [
      RC_VOTE_NOTICE_LIST_QUERY_KEY,
      bigIntToString(projectId),
      pageIndex,
    ],
    queryFn: () =>
      getRCVoteNoticeList(projectId, pageIndex, ITEM_COUNT_PER_PAGE.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
