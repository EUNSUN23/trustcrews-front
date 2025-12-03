'use client';

import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { projectUpdFormStateStore } from '@/features/composite/projectUpdateForm/store/ProjectUpdFormStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import {
  UpdateProjectInfoInput,
  updateProjectInfoInputSchema,
  useUpdateProjectInfo,
} from '@/features/core/project/api/updateProjectInfo';
import { ZodError } from 'zod';
import { PROJECT_INFO_SUMMARY_QUERY_KEY } from '@/features/core/project/api/getProjectInfoSummary';
import { useQueryClient } from '@tanstack/react-query';

type SaveProjectUpdButtonProps = {
  projectId: string;
  userPMAuthCode: string;
};

const SaveProjectUpdButton = ({
  projectId,
  userPMAuthCode,
}: SaveProjectUpdButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const {
    data: { projectName, projectSubject, startDate, endDate, technologyIds },
  } = useRecoilValue(projectUpdFormStateStore);

  const queryClient = useQueryClient();
  const { mutate: updatePost, isPending: isUpdating } = useUpdateProjectInfo(
    numStrToBigInt(projectId),
    userPMAuthCode,
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({
          queryKey: [PROJECT_INFO_SUMMARY_QUERY_KEY],
        });
        setSuccessSnackbar(res.message);
      },
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleClickUpdateButton = () => {
    const data: UpdateProjectInfoInput = {
      projectName,
      projectSubject,
      startDate,
      endDate,
      technologyIds: technologyIds.map((v) => numStrToBigInt(v)),
    };

    try {
      updateProjectInfoInputSchema.parse(data);
    } catch (e: unknown) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    updatePost(data);
  };

  return (
    <Button
      size='md'
      onClick={handleClickUpdateButton}
      disabled={isUpdating}
      className='disabled:!bg-gray-400 disabled:!text-white'
    >
      저장
    </Button>
  );
};

export default SaveProjectUpdButton;
