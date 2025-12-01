import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import FWVoteNoticeDetail from '@/features/projectBoard/ui/projectNoticeBoard/fwVoteNotice/fwVoteNoticeModal/FWVoteNoticeDetail';
import { fwNoticeModalState } from '@/store/projectDetail/notice/fwVoteNotice/FWVoteNoticeModalStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import FWVoteNoticeDetailSkeleton from '@/features/projectBoard/ui/projectNoticeBoard/fwVoteNotice/fwVoteNoticeModal/FWVoteNoticeDetailSkeleton';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const FWVoteNoticeModal = () => {
  const { isOpen, title } = useRecoilValue(fwNoticeModalState);
  const resetVAlertFWModalState = useResetRecoilState(fwNoticeModalState);

  const [portalElement] = useModalPortalElement(isOpen);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={resetVAlertFWModalState}
              title={title}
            >
              <FieldQueryBoundary
                errorFallbackSize='md'
                suspenseFallback={<FWVoteNoticeDetailSkeleton />}
              >
                <FWVoteNoticeDetail />
              </FieldQueryBoundary>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default FWVoteNoticeModal;
