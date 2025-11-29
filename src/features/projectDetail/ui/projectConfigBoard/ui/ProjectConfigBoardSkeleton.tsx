import ProjectConfigFormSkeleton from '@/features/projectDetail/ui/projectConfigBoard/ui/projectInfoEditor/ProjectConfigFormSkeleton';
import PMAuthEditorSkeleton from '@/features/projectDetail/ui/projectConfigBoard/ui/pmAuthEditor/PMAuthEditorSkeleton';
import ConfigSummaryLayout from '@/features/projectDetail/ui/projectConfigBoard/ui/ConfigSummaryLayout';
import ConfigLayout from '@/features/projectDetail/ui/projectConfigBoard/ui/ConfigLayout';
import ButtonSkeleton from '@/shared/ui/skeleton/ButtonSkeleton';
import PostConfigFormSkeleton from '@/features/projectDetail/ui/projectConfigBoard/ui/postInfoEditor/PostConfigFormSkeleton';

const ProjectConfigBoardSkeleton = () => {
  return (
    <section className='w-full mx-auto space-y-[100px]'>
      <ProjectConfigFormSkeleton />
      <PostConfigFormSkeleton />
      <PMAuthEditorSkeleton />
      <ConfigLayout>
        <ConfigSummaryLayout>프로젝트 종료</ConfigSummaryLayout>
        <div className='w-[380px] tablet:w-full flex flex-col items-start justify-center'>
          <p className='text-danger font-medium mb-5'>
            &#8251; 프로젝트 종료시, 획득한 신뢰점수를 제외한 프로젝트와 관련된
            모든 정보가 삭제됩니다. 반드시 멤버들과 상의후 종료해주세요.
          </p>
          <ButtonSkeleton size='md'>프로젝트 종료</ButtonSkeleton>
        </div>
      </ConfigLayout>
    </section>
  );
};

export default ProjectConfigBoardSkeleton;
