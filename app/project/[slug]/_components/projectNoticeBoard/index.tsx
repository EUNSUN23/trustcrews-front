import NoticeNavTab from './NoticeNavTab';
import RCVoteNoticeContainer from '@/features/composite/projectNotice/rcVoteNotice/ui/RCVoteNoticeContainer';
import CrewNoticeContainer from '@/features/composite/projectNotice/crewNotice/ui/CrewNoticeContainer';
import RCVoteNoticeModal from '@/features/composite/projectNotice/rcVoteNotice/ui/rcVoteNoticeModal';
import { useRecoilValue } from 'recoil';
import { activeNoticeTabStateStore } from '../../../_store/ActiveNoticeTabStateStore';
import ContentsLoader from '@/shared/ui/ContentsLoader';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { ApplicationError } from '@/lib/error/ApplicationError';
import { PROJECT_NOTICE_TABS } from '@/entities/projectNoticeTabType';
import { projectIdState } from '../../../_store/ProjectIdStateStore';
import FWVoteNoticeContainer from '@/features/composite/projectNotice/fwVoteNotice/ui/FWVoteNoticeContainer';
import { projectManageAuthStateStore } from '../../../_store/ProjectManageAuthStateStore';

const {
  NTAB001: { code: RCVOTE_NOTICE_TAB },
  NTAB002: { code: FWVOTE_NOTICE_TAB },
  NTAB003: { code: CREW_NOTICE_TAB },
} = PROJECT_NOTICE_TABS;

export const ProjectNoticeBoard = () => {
  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuthCode } = useRecoilValue(projectManageAuthStateStore);
  const { code: activeNoticeTab } = useRecoilValue(activeNoticeTabStateStore);

  let contents = null;
  switch (activeNoticeTab) {
    case RCVOTE_NOTICE_TAB:
      contents = (
        <RCVoteNoticeContainer
          projectId={projectId}
          userPMAuthCode={userPMAuthCode}
        />
      );
      break;
    case FWVOTE_NOTICE_TAB:
      contents = (
        <FWVoteNoticeContainer
          projectId={projectId}
          userPMAuthCode={userPMAuthCode}
        />
      );
      break;
    case CREW_NOTICE_TAB:
      contents = <CrewNoticeContainer projectId={projectId} />;
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
        <RCVoteNoticeModal />
      </section>
    </section>
  );
};
