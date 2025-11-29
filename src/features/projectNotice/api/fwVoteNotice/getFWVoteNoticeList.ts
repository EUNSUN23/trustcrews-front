import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { NOTICE_TYPES } from '@/constants/data/projectDetail/notice/noticeTypes';
import { ProjectAuthMap } from '@/types/data/projectDetail/projectAuth';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';
import { VoteStatusType } from '@/types/data/projectDetail/projectVote/projectVote';

export type FWVoteNoticeData = {
  noticeId: bigint;
  voteId: bigint;
  crewId: bigint;
  crewPMAuth: ProjectAuthMap;
  noticeType: typeof NOTICE_TYPES.PRA1003;
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
