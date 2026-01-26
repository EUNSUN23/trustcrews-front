import ProjectUpdFormContainerSkeleton from '@/features/composite/projectUpdateForm/ui/ProjectUpdFormContainerSkeleton';
import PMAuthEditorContainerSkeleton from '@/features/composite/projectAuthEditor/ui/PMAuthEditorContainerSkeleton';
import FormTitleLayout from '@/shared/ui/formLayout/FormTitleLayout';
import FormContainerLayout from '@/shared/ui/formLayout/FormContainerLayout';
import ButtonSkeleton from '@/shared/ui/skeleton/ButtonSkeleton';
import PostUpdFormContainerSkeleton from '@/features/composite/postUpdateForm/ui/PostUpdFormContainerSkeleton';

const ProjectConfigBoardSkeleton = () => {
  return (
    <section className='w-full mx-auto space-y-[100px]'>
      <ProjectUpdFormContainerSkeleton />
      <PostUpdFormContainerSkeleton />
      <PMAuthEditorContainerSkeleton />
      <FormContainerLayout>
        <FormTitleLayout>프로젝트 종료</FormTitleLayout>
        <div className='w-[380px] tablet:w-full flex flex-col items-start justify-center'>
          <p className='text-danger font-medium mb-5'>
            &#8251; 프로젝트 종료시, 획득한 신뢰점수를 제외한 프로젝트와 관련된
            모든 정보가 삭제됩니다. 반드시 멤버들과 상의후 종료해주세요.
          </p>
          <ButtonSkeleton size='md'>프로젝트 종료</ButtonSkeleton>
        </div>
      </FormContainerLayout>
    </section>
  );
};

export default ProjectConfigBoardSkeleton;
