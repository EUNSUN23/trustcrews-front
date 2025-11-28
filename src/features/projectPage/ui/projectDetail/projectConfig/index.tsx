import PostConfigForm from '@/features/projectPage/ui/projectDetail/projectConfig/postInfoEditor/PostConfigForm';
import ProjectConfigFormSkeleton from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/ProjectConfigFormSkeleton';
import ProjectConfigForm from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/ProjectConfigForm';
import PMAuth from '@/features/projectDetail/config/components/pmAuth/PMAuth';
import EndProject from '@/features/projectPage/ui/projectDetail/projectConfig/EndProject';
import PMAuthSkeleton from '@/features/projectDetail/config/components/pmAuth/PMAuthSkeleton';
import PostConfigFormSkeleton from '@/features/projectPage/ui/projectDetail/projectConfig/postInfoEditor/PostConfigFormSkeleton';
import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const ProjectConfig = () => {
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
      <ConfigContainer>
        <ConfigSummary>크루 권한</ConfigSummary>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<PMAuthSkeleton />}
        >
          <PMAuth />
        </FieldQueryBoundary>
      </ConfigContainer>
      <EndProject />
    </section>
  );
};

export default ProjectConfig;
