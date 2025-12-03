'use client';

import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import useSnackbar from '@/shared/hooks/useSnackbar';
import {
  LeaveProjectInput,
  useLeaveProject,
} from '@/features/core/crews/api/leaveProject';
import { ProjectCrewProfileInfo } from '@/features/core/crews/api/getCrewDetail';
import { CREW_NOTICE_LIST_QUERY_KEY } from '@/features/core/projectNotice/api/crewNotice/getCrewNoticeList';
import { CREW_LIST_QUERY_KEY } from '@/features/core/crews/api/getProjectCrewList';
import { useQueryClient } from '@tanstack/react-query';

type CrewOutButtonProps = {
  crewInfo: ProjectCrewProfileInfo;
};

const CrewOutButton = ({ crewInfo }: CrewOutButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const {
    crewPMAuth: { code: crewPMAuth },
    crewId,
    projectId,
  } = crewInfo;
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: leaveProject, isPending } = useLeaveProject({
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [CREW_NOTICE_LIST_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [CREW_LIST_QUERY_KEY],
        refetchType: 'all',
      });
      setSuccessSnackbar(res.message);
      router.replace('/');
    },
    onError: (error) => setErrorSnackbar(error.message),
  });

  const handleClickLeaveButton = () => {
    if (confirm('프로젝트를 탈퇴하시겠습니까?')) {
      const reqData: LeaveProjectInput = {
        projectId,
        crewId,
        crewPMAuth,
      };
      leaveProject(reqData);
    }
  };

  return (
    <Button
      type='button'
      theme='primaryHollow'
      size='lg'
      onClick={handleClickLeaveButton}
      disabled={isPending}
    >
      프로젝트 탈퇴
    </Button>
  );
};

export default CrewOutButton;
