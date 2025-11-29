import NoticeNavTab from '@/features/projectDetail/ui/projectNoticeBoard/NoticeNavTab';
import RCVoteNotice from '@/features/projectDetail/ui/projectNoticeBoard/rcVoteNotice';
import FWVoteNotices from '@/features/projectDetail/ui/projectNoticeBoard/fwVoteNotice';
import CrewNotices from '@/features/projectDetail/ui/projectNoticeBoard/crewNotice';
import FWVoteNoticeModal from '@/features/projectDetail/ui/projectNoticeBoard/fwVoteNotice/fwVoteNoticeModal';
import RCVoteNoticeModal from '@/features/projectDetail/ui/projectNoticeBoard/rcVoteNotice/rcVoteNoticeModal';
import { useRecoilValue } from 'recoil';
import { activeNoticeTabStateStore } from '@/store/projectDetail/notice/ActiveNoticeTabStateStore';
import { NOTICE_TABS } from '@/features/projectNotice/constants/noticeTabs';
import ContentsLoader from '@/shared/ui/ContentsLoader';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { ApplicationError } from '@/shared/utils/ApplicationError';

const {
  NTAB001: { code: RCVOTE_NOTICE_TAB },
  NTAB002: { code: FWVOTE_NOTICE_TAB },
  NTAB003: { code: CREW_NOTICE_TAB },
} = NOTICE_TABS;

export const ProjectNoticeBoard = () => {
  const { code: activeNoticeTab } = useRecoilValue(activeNoticeTabStateStore);

  let contents = null;
  switch (activeNoticeTab) {
    case RCVOTE_NOTICE_TAB:
      contents = <RCVoteNotice />;
      break;
    case FWVOTE_NOTICE_TAB:
      contents = <FWVoteNotices />;
      break;
    case CREW_NOTICE_TAB:
      contents = <CrewNotices />;
      break;
    default:
      throw new ApplicationError(`Unknown Notice Tab: ${activeNoticeTab}`);
  }

  return (
    <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
      <NoticeNavTab />
      <section className='mb-20 tablet:basis-4/5'>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<ContentsLoader />}
        >
          {contents}
        </FieldQueryBoundary>
        <FWVoteNoticeModal />
        <RCVoteNoticeModal />
      </section>
    </section>
  );
};
