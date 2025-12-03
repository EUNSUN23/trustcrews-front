import InputStyleSkeleton from '@/shared/ui/skeleton/InputStyleSkeleton';
import FormContainerLayout from '@/shared/ui/formLayout/FormContainerLayout';
import FormTitleLayout from '@/shared/ui/formLayout/FormTitleLayout';
import FormContentsLayout from '@/shared/ui/formLayout/FormContentsLayout';

const ProjectUpdFormContainerSkeleton = () => {
  return (
    <FormContainerLayout>
      <FormTitleLayout>프로젝트 정보</FormTitleLayout>
      <FormContentsLayout>
        <InputStyleSkeleton label='프로젝트 이름' />
        <InputStyleSkeleton label='프로젝트 주제' />
        <div className='row-span-2'>
          <div className='w-[380px] tablet:w-full space-y-10 mobile:mx-auto'>
            <InputStyleSkeleton label='시작 날짜' />
            <InputStyleSkeleton label='종료 날짜' />
          </div>
        </div>
        <InputStyleSkeleton label='기술 스택' />
      </FormContentsLayout>
    </FormContainerLayout>
  );
};

export default ProjectUpdFormContainerSkeleton;
