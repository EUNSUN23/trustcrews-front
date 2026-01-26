import PostUpdFormContainer from '@/features/composite/postUpdateForm/ui/PostUpdFormContainer';
import ProjectUpdFormContainerSkeleton from '@/features/composite/projectUpdateForm/ui/ProjectUpdFormContainerSkeleton';
import ProjectUpdFormContainer from '@/features/composite/projectUpdateForm/ui/ProjectUpdFormContainer';
import PMAuthEditorContainer from '@/features/composite/projectAuthEditor/ui/PMAuthEditorContainer';
import EndProject from './EndProject';
import PMAuthEditorContainerSkeleton from '@/features/composite/projectAuthEditor/ui/PMAuthEditorContainerSkeleton';
import PostUpdFormContainerSkeleton from '@/features/composite/postUpdateForm/ui/PostUpdFormContainerSkeleton';
import FormTitleLayout from '@/shared/ui/formLayout/FormTitleLayout';
import FormContainerLayout from '@/shared/ui/formLayout/FormContainerLayout';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { useRecoilValue } from 'recoil';
import { projectManageAuthStateStore } from '../../../_store/ProjectManageAuthStateStore';
import { projectIdState } from '../../../_store/ProjectIdStateStore';

const ProjectConfigBoard = () => {
  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuthCode } = useRecoilValue(projectManageAuthStateStore);

  return (
    <section className='w-full mx-auto space-y-[100px]'>
      <FieldQueryBoundary
        errorFallbackSize='md'
        suspenseFallback={<ProjectUpdFormContainerSkeleton />}
      >
        <ProjectUpdFormContainer
          projectId={projectId}
          userPMAuthCode={userPMAuthCode}
        />
      </FieldQueryBoundary>
      <FieldQueryBoundary
        errorFallbackSize='md'
        suspenseFallback={<PostUpdFormContainerSkeleton />}
      >
        <PostUpdFormContainer
          projectId={projectId}
          userPMAuthCode={userPMAuthCode}
        />
      </FieldQueryBoundary>
      <FormContainerLayout>
        <FormTitleLayout>크루 권한</FormTitleLayout>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<PMAuthEditorContainerSkeleton />}
        >
          <PMAuthEditorContainer
            projectId={projectId}
            userPMAuthCode={userPMAuthCode}
          />
        </FieldQueryBoundary>
      </FormContainerLayout>
      <EndProject />
    </section>
  );
};

export default ProjectConfigBoard;
