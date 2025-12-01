import PostConfigForm from '@/features/projectDetail/ui/projectConfigBoard/postInfoEditor/PostConfigForm';
import ProjectConfigFormSkeleton from '@/features/projectDetail/ui/projectConfigBoard/projectInfoEditor/ProjectConfigFormSkeleton';
import ProjectConfigForm from '@/features/projectDetail/ui/projectConfigBoard/projectInfoEditor/ProjectConfigForm';
import PMAuthEditor from '@/features/projectDetail/ui/projectConfigBoard/pmAuthEditor/PMAuthEditor';
import EndProject from '@/features/projectDetail/ui/projectConfigBoard/EndProject';
import PMAuthEditorSkeleton from '@/features/projectDetail/ui/projectConfigBoard/pmAuthEditor/PMAuthEditorSkeleton';
import PostConfigFormSkeleton from '@/features/projectDetail/ui/projectConfigBoard/postInfoEditor/PostConfigFormSkeleton';
import ConfigSummaryLayout from '@/features/projectDetail/ui/projectConfigBoard/ConfigSummaryLayout';
import ConfigLayout from '@/features/projectDetail/ui/projectConfigBoard/ConfigLayout';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const ProjectConfigBoard = () => {
  return (
    <section className='w-full mx-auto space-y-[100px]'>
      <FieldQueryBoundary
        errorFallbackSize='md'
        suspenseFallback={<ProjectConfigFormSkeleton />}
      >
        <ProjectConfigForm />
      </FieldQueryBoundary>
      <FieldQueryBoundary
        errorFallbackSize='md'
        suspenseFallback={<PostConfigFormSkeleton />}
      >
        <PostConfigForm />
      </FieldQueryBoundary>
      <ConfigLayout>
        <ConfigSummaryLayout>크루 권한</ConfigSummaryLayout>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<PMAuthEditorSkeleton />}
        >
          <PMAuthEditor />
        </FieldQueryBoundary>
      </ConfigLayout>
      <EndProject />
    </section>
  );
};

export default ProjectConfigBoard;
