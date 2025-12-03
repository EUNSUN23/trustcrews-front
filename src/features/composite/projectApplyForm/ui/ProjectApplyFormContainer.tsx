'use client';

import Button from '@/shared/ui/Button';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useRecoilState, useResetRecoilState } from 'recoil';
import ApplyPositionDropdown from '@/features/composite/projectApplyForm/ui/ApplyPositionDropdown';
import { useEffect } from 'react';
import { useApplyProject } from '@/features/core/projectApplication/api/applyProject';
import { projectApplyPositionState } from '@/features/composite/projectApplyForm/store/ApplyPositionStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { DEFAULT_POSITION_OPTION } from '@/features/core/position/constants/defaultPositionOption';
import { useRouter } from 'next/navigation';
import { Position } from '@/entities/position';

type ApplySectionProps = {
  isAuthorized: boolean;
  projectId: bigint;
  positions: Position[];
};

const ProjectApplyFormContainer = ({
  isAuthorized,
  projectId,
  positions,
}: ApplySectionProps) => {
  const router = useRouter();
  const { setSuccessSnackbar, setErrorSnackbar, setInfoSnackbar } =
    useSnackbar();
  const resetApplyPosition = useResetRecoilState(projectApplyPositionState);
  const [applyPosition, setApplyPosition] = useRecoilState(
    projectApplyPositionState,
  );

  useEffect(() => {
    return () => resetApplyPosition();
  }, [resetApplyPosition]);

  const { mutate: applyProject, isPending: isUpdating } = useApplyProject({
    onSuccess: (res) => {
      resetApplyPosition();
      setSuccessSnackbar(res.message);
    },
    onError: (error) => {
      setErrorSnackbar(error.message);
    },
  });

  const handleClickApplyButton = () => {
    if (!isAuthorized) {
      router.push('/login');
      return;
    }
    if (applyPosition.value === DEFAULT_POSITION_OPTION.value) {
      setInfoSnackbar('포지션을 선택해 주세요.');
      return;
    }
    applyProject({
      projectId,
      positionId: numStrToBigInt(applyPosition.value),
    });
  };

  return (
    <footer className='flex justify-center gap-5 my-5'>
      <ApplyPositionDropdown
        applyPositions={positions}
        selected={applyPosition}
        onChangeCallback={(item) => setApplyPosition(item)}
      />
      <Button
        type='button'
        size='lg'
        onClick={handleClickApplyButton}
        disabled={isUpdating}
      >
        참여하기
      </Button>
    </footer>
  );
};

export default ProjectApplyFormContainer;
