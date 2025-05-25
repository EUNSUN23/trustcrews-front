import PostConfigForm from '@/features/projectDetail/config/contents/post/PostConfigForm';
import ProjectConfigFormSkeleton from '@/features/projectDetail/config/contents/project/ProjectConfigFormSkeleton';
import ProjectConfigForm from '@/features/projectDetail/config/contents/project/ProjectConfigForm';
import PMAuth from '@/features/projectDetail/config/contents/pmAuth/PMAuth';
import EndProject from '@/features/projectDetail/config/contents/endProject/EndProject';
import PMAuthSkeleton from '@/features/projectDetail/config/contents/pmAuth/PMAuthSkeleton';
import PostConfigFormSkeleton from '@/features/projectDetail/config/contents/post/PostConfigFormSkeleton';
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
