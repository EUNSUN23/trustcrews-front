import NoticeBadge from '@/features/core/projectNotice/ui/NoticeBadge';
import VoteStatusBadge from '@/features/core/projectVote/ui/VoteStatusBadge';
import { useSetRecoilState } from 'recoil';
import { fwNoticeModalState } from '@/features/composite/projectNotice/fwVoteNotice/store/FWVoteNoticeModalStateStore';
import { FWVoteNoticeData } from '@/features/composite/projectNotice/fwVoteNotice/api/getFWVoteNoticeList';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { PROJECT_NOTICE_TYPES } from '@/entities/projectNoticeType';

type VAlertFwListItemProps = {
  data: FWVoteNoticeData;
  projectId: string;
  userPMAuthCode: string;
};

const FWVoteNoticeItem = ({
  data,
  projectId,
  userPMAuthCode,
}: VAlertFwListItemProps) => {
  const setVAlertFWModalState = useSetRecoilState(fwNoticeModalState);

  const {
    noticeId,
    contents,
    createDate,
    voteStatus,
    voteId,
    crewId,
    crewPMAuth: { code: crewPMAuth },
  } = data;

  const handleClickNoticeItem = () => {
    setVAlertFWModalState({
      isOpen: true,
      title: contents,
      projectId,
      voteId: bigIntToString(voteId),
      crewId: bigIntToString(crewId),
      userPMAuth: userPMAuthCode,
      crewPMAuth,
    });
  };

  return (
    <li
      key={`fwVoteNotice-${noticeId}`}
      className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer`}
      onClick={handleClickNoticeItem}
    >
      <div className='flex items-center gap-x-4'>
        <NoticeBadge noticeType={PROJECT_NOTICE_TYPES.PRA1003.code}>
          {PROJECT_NOTICE_TYPES.PRA1003.name}
        </NoticeBadge>
        <VoteStatusBadge voteStatus={voteStatus.code}>
          {voteStatus.name}
        </VoteStatusBadge>
        {contents}
      </div>
      <div className='ml-auto text-grey600'>{createDate}</div>
    </li>
  );
};

export default FWVoteNoticeItem;
