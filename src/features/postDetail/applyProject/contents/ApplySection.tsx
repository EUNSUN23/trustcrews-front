'use client';

import Button from '@/shared/ui/Button';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import ApplyPositionDropdown from '@/features/postDetail/applyProject/components/ApplyPositionDropdown';
import { useEffect } from 'react';
import { useApplyProject } from '@/features/postDetail/applyProject/api/applyProject';
import { PostDetailData } from '@/features/postDetail/postInfo/api/getPostDetail';
import { projectApplyPositionState } from '@/store/postDetail/applyProject/ApplyPositionStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { DEFAULT_POSITION_OPTION } from '@/features/position/constants/defaultPositionOption';

const ApplySection = ({ postInfo }: { postInfo: PostDetailData }) => {
  const { setSuccessSnackbar, setErrorSnackbar, setInfoSnackbar } =
    useSnackbar();
  const resetRecruitPositionState = useResetRecoilState(
    projectApplyPositionState,
  );

  useEffect(() => {
    return () => resetRecruitPositionState();
  }, [resetRecruitPositionState]);

  const { value: recruitPosition } = useRecoilValue(projectApplyPositionState);

  const { mutate: applyProject, isPending: isUpdating } = useApplyProject({
    onSuccess: (res) => {
      resetRecruitPositionState();
      setSuccessSnackbar(res.message);
    },
    onError: (error) => {
      setErrorSnackbar(error.message);
    },
  });

  const handleClickApplyButton = () => {
    if (recruitPosition === DEFAULT_POSITION_OPTION.value) {
      setInfoSnackbar('포지션을 선택해 주세요.');
      return;
    }

    applyProject({
      projectId: postInfo.projectId,
      positionId: numStrToBigInt(recruitPosition),
    });
  };

  return (
    <footer className='flex justify-center gap-5 my-5'>
      <ApplyPositionDropdown applyPositions={postInfo.postPositions} />
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

export default ApplySection;
