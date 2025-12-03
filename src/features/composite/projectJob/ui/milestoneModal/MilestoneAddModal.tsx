'use client';

import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/shared/ui/Modal';
import { createPortal } from 'react-dom';
import MilestoneDateControl from '@/features/composite/projectJob/ui/milestoneModal/milestoneInputControl/MilestoneDateControl';
import MilestoneContentControl from '@/features/composite/projectJob/ui/milestoneModal/milestoneInputControl/MilestoneContentControl';
import {
  createMilestoneInputSchema,
  useCreateMilestone,
} from '@/features/core/milestone/api/createMilestone';
import {
  milestoneAddFormStateStore,
  milestoneAddModalStateStore,
} from '@/features/composite/projectJob/store/MilestoneModalStateStore';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { activeMilestoneStateStore } from '@/features/composite/projectJob/store/ActiveMilestoneStateStore';
import { ZodError } from 'zod';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { MILESTONES_QUERY_KEY } from '@/features/core/milestone/api/getMilestones';
import { useQueryClient } from '@tanstack/react-query';

type MilestoneAddModalProps = {
  projectId: string;
  userPMAuthCode: string;
};

const MilestoneAddModal = ({
  projectId,
  userPMAuthCode,
}: MilestoneAddModalProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { isOpen, title } = useRecoilValue(milestoneAddModalStateStore);
  const [portalElement] = useModalPortalElement(isOpen);
  const resetMilestoneAddModalState = useResetRecoilState(
    milestoneAddModalStateStore,
  );
  const resetMilestoneAddData = useResetRecoilState(milestoneAddFormStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);
  const milestoneAddData = useRecoilValue(milestoneAddFormStateStore);

  const queryClient = useQueryClient();
  const { mutate: createMilestone, isPending: isCreating } = useCreateMilestone(
    numStrToBigInt(projectId),
    userPMAuthCode,
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({
          queryKey: [MILESTONES_QUERY_KEY],
        });
        setSuccessSnackbar(res.message);
        resetMilestoneAddModalState();
        resetMilestoneAddData();
        resetActiveMilestone();
      },
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleClickCloseButton = () => {
    resetMilestoneAddModalState();
    resetMilestoneAddData();
  };

  const handleClickConfirmButton = () => {
    try {
      createMilestoneInputSchema.parse(milestoneAddData);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    createMilestone(milestoneAddData);
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={handleClickCloseButton}
              title={title}
              isUpdating={isCreating}
              onClickConfirmHandler={handleClickConfirmButton}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <MilestoneContentControl />
                  <MilestoneDateControl />
                </div>
              </section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default MilestoneAddModal;
