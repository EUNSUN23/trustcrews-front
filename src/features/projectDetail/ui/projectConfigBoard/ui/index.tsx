import PostConfigForm from '@/features/projectDetail/ui/projectConfigBoard/ui/postInfoEditor/PostConfigForm';
import ProjectConfigFormSkeleton from '@/features/projectDetail/ui/projectConfigBoard/ui/projectInfoEditor/ProjectConfigFormSkeleton';
import ProjectConfigForm from '@/features/projectDetail/ui/projectConfigBoard/ui/projectInfoEditor/ProjectConfigForm';
import Index from '@/features/projectDetail/ui/projectConfigBoard/ui/pmAuthEditor';
import EndProject from '@/features/projectDetail/ui/projectConfigBoard/ui/EndProject';
import PMAuthEditorSkeleton from '@/features/projectDetail/ui/projectConfigBoard/ui/pmAuthEditor/PMAuthEditorSkeleton';
import PostConfigFormSkeleton from '@/features/projectDetail/ui/projectConfigBoard/ui/postInfoEditor/PostConfigFormSkeleton';
import ConfigSummaryLayout from '@/features/projectDetail/ui/projectConfigBoard/ui/ConfigSummaryLayout';
import ConfigLayout from '@/features/projectDetail/ui/projectConfigBoard/ui/ConfigLayout';
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
          <Index />
        </FieldQueryBoundary>
      </ConfigLayout>
      <EndProject />
    </section>
  );
};

export default ProjectConfigBoard;
