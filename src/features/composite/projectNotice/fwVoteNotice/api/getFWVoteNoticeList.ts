import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectAuth } from '@/entities/projectAuth';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/shared/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';
import { PROJECT_NOTICE_TYPES } from '@/entities/projectNoticeType';
import { VoteStatusType } from '@/entities/projectVote/voteStatus';

export type FWVoteNoticeData = {
  noticeId: bigint;
  voteId: bigint;
  crewId: bigint;
  crewPMAuth: ProjectAuth;
  noticeType: typeof PROJECT_NOTICE_TYPES.PRA1003;
  contents: string;
  voteStatus: VoteStatusType;
  createDate: string;
};

export const getFWVoteNoticeList = async (
  projectId: bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<FWVoteNoticeData[]>> => {
  return request(
    'GET',
    `/api/projectNotice/auth/fwVote/list?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const FWVOTE_NOTICE_LIST_QUERY_KEY = 'fwVoteNoticeList';

export const useFWVoteNoticeList = (projectId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: [
      FWVOTE_NOTICE_LIST_QUERY_KEY,
      bigIntToString(projectId),
      pageIndex,
    ],
    queryFn: () =>
      getFWVoteNoticeList(projectId, pageIndex, ITEM_COUNT_PER_PAGE.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
