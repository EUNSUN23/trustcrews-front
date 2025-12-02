import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import RCVoteNoticeDetail from '@/features/composite/projectBoard/ui/projectNoticeBoard/rcVoteNotice/rcVoteNoticeModal/RCVoteNoticeDetail';
import { rcVoteNoticeModalState } from '@/features/composite/projectBoard/store/notice/rcVoteNotice/RCVoteNoticeModalStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import RCVoteNoticeDetailSkeleton from '@/features/composite/projectBoard/ui/projectNoticeBoard/rcVoteNotice/rcVoteNoticeModal/RCVoteNoticeDetailSkeleton';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const RCVoteNoticeModal = () => {
  const resetRCVoteNoticeModalState = useResetRecoilState(
    rcVoteNoticeModalState,
  );

  const { isOpen, title } = useRecoilValue(rcVoteNoticeModalState);

  const [portalElement] = useModalPortalElement(isOpen);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={resetRCVoteNoticeModalState}
              title={title}
            >
              <FieldQueryBoundary
                errorFallbackSize='md'
                suspenseFallback={<RCVoteNoticeDetailSkeleton />}
              >
                <RCVoteNoticeDetail />
              </FieldQueryBoundary>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default RCVoteNoticeModal;
