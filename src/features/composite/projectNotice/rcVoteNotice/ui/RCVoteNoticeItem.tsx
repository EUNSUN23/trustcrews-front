import NoticeBadge from '@/features/core/projectNotice/ui/NoticeBadge';
import VoteStatusBadge from '@/features/core/projectVote/ui/VoteStatusBadge';
import { useSetRecoilState } from 'recoil';
import { rcVoteNoticeModalState } from '@/features/composite/projectNotice/rcVoteNotice/store/RCVoteNoticeModalStateStore';
import { RCVoteNoticeData } from '@/features/composite/projectNotice/rcVoteNotice/api/getRCVoteNoticeList';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { PROJECT_NOTICE_TYPES } from '@/entities/projectNoticeType';

const {
  PRA1002: { code: RecruitNoticeCode, name: RecruitNoticeName },
} = PROJECT_NOTICE_TYPES;

type RCVoteNoticeListItemProps = {
  data: RCVoteNoticeData;
  userPMAuthCode: string;
};

const RCVoteNoticeItem = ({
  data,
  userPMAuthCode,
}: RCVoteNoticeListItemProps) => {
  const setVAlertRecruitModalState = useSetRecoilState(rcVoteNoticeModalState);

  const {
    noticeId,
    voteId,
    applyId,
    contents,
    createDate,
    voteStatus: { code: voteStatusCode, name: voteStatusName },
  } = data;

  const handleClickNoticeItem = () => {
    setVAlertRecruitModalState({
      isOpen: true,
      title: contents,
      voteId: bigIntToString(voteId),
      noticeId: bigIntToString(noticeId),
      applyId: bigIntToString(applyId),
      userPMAuth: userPMAuthCode,
    });
  };

  return (
    <li
      key={`recruitNotice-${noticeId}`}
      className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer'
      onClick={handleClickNoticeItem}
    >
      <div className='flex items-center gap-x-4'>
        <NoticeBadge noticeType={RecruitNoticeCode}>
          {RecruitNoticeName}
        </NoticeBadge>
        <VoteStatusBadge voteStatus={voteStatusCode}>
          {voteStatusName}
        </VoteStatusBadge>
        {contents}
      </div>
      <div className='ml-auto text-grey600'>{createDate}</div>
    </li>
  );
};

export default RCVoteNoticeItem;
