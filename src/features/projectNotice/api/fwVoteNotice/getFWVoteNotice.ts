import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectAuthMap } from '@/types/data/projectDetail/projectAuth';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/shared/types/responseBody';
import {
  FWVoteReason,
  VoteData,
} from '@/types/data/projectDetail/projectVote/projectVote';

export type FWVoteNoticeDetailData = VoteData & {
  reason: FWVoteReason;
  crewPMAuth: ProjectAuthMap;
  crewPosition: {
    id: bigint;
    name: string;
  };
  crewProfileImgSrc: string;
  crewNickname: string;
};

export const getFWVoteNotice = async (
  voteId: bigint,
  fwMemberId: bigint,
): Promise<ResponseBody<FWVoteNoticeDetailData>> => {
  const reqUrl = `/api/projectNotice/auth/fwVote?voteId=${voteId}&fwMemberId=${fwMemberId}`;
  return await request('GET', reqUrl);
};

export const FWVOTE_NOTICE_QUERY_KEY = 'vAlertFWDetailData';

export const useFWVoteNotice = (voteId: bigint, fwCrewId: bigint) => {
  return useSuspenseQuery({
    queryKey: [
      FWVOTE_NOTICE_QUERY_KEY,
      bigIntToString(voteId),
      bigIntToString(fwCrewId),
    ],
    queryFn: () => getFWVoteNotice(voteId, fwCrewId),
  });
};
