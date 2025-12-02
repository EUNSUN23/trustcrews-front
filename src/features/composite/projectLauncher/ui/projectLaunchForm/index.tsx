import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';
import { postFormStateStore } from '@/features/composite/projectLauncher/store/PostFormStateStore';
import { projectFormStateStore } from '@/features/composite/projectLauncher/store/ProjectFormStateStore';
import { useEffect } from 'react';
import LaunchPostTitleControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchPostTitleControl';
import LaunchProjectNameControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchProjectNameControl';
import LaunchProjectSubjectControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchProjectSubjectControl';
import LaunchPositionControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchPositionControl';
import LaunchProjectDateControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchProjectDateControl';
import LaunchTechStackControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchTechStackControl';
import LaunchContactControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchContactControl';
import LaunchPostContentControl from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchPostContentControl';
import RowWide from '@/shared/ui/RowWide';
import Button from '@/shared/ui/Button';
import LaunchButton from '@/features/composite/projectLauncher/ui/projectLaunchForm/LaunchButton';

export const ProjectLaunchForm = () => {
  const router = useRouter();
  const resetPostFormState = useResetRecoilState(postFormStateStore);
  const resetProjectFormState = useResetRecoilState(projectFormStateStore);

  useEffect(() => {
    return () => {
      resetPostFormState();
      resetProjectFormState();
    };
  }, [resetPostFormState, resetProjectFormState]);

  const handleClickCancelButton = () => {
    router.push('/');
  };

  return (
    <div
      role='form'
      aria-label='게시글 및 프로젝트 생성'
      className='p-5 mobile:p-1 mb-8'
    >
      <LaunchPostTitleControl />
      <div className='grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center'>
        <LaunchProjectNameControl />
        <LaunchProjectSubjectControl />
        <LaunchPositionControl />
        <LaunchProjectDateControl />
        <LaunchTechStackControl />
        <LaunchContactControl />
      </div>
      <LaunchPostContentControl />
      <RowWide className='space-x-2 text-center mt-10'>
        <Button theme='primaryHollow' onClick={handleClickCancelButton}>
          취소
        </Button>
        <LaunchButton />
      </RowWide>
    </div>
  );
};
