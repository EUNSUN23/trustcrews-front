import Button from '@/shared/ui/Button';
import { useResetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { projectUpdFormStateStore } from '@/features/composite/projectUpdateForm/store/ProjectUpdFormStateStore';
import { PROJECT_INFO_SUMMARY_QUERY_KEY } from '@/features/core/project/api/getProjectInfoSummary';

const ResetProjectUpdButton = () => {
  const resetProjectConfigForm = useResetRecoilState(projectUpdFormStateStore);

  const queryClient = useQueryClient();

  const handleClickResetButton = () => {
    resetProjectConfigForm();
    queryClient.invalidateQueries({
      queryKey: [PROJECT_INFO_SUMMARY_QUERY_KEY],
    });
  };

  return (
    <Button theme='primaryHollow' size='md' onClick={handleClickResetButton}>
      초기화
    </Button>
  );
};

export default ResetProjectUpdButton;
