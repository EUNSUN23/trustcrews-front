import InputStyleSkeleton from '@/shared/ui/skeleton/InputStyleSkeleton';
import ConfigLayout from '@/features/projectDetail/ui/projectConfigBoard/ui/ConfigLayout';
import ConfigSummaryLayout from '@/features/projectDetail/ui/projectConfigBoard/ui/ConfigSummaryLayout';
import ConfigContentsLayout from '@/features/projectDetail/ui/projectConfigBoard/ui/ConfigContentsLayout';

const ProjectConfigFormSkeleton = () => {
  return (
    <ConfigLayout>
      <ConfigSummaryLayout>프로젝트 정보</ConfigSummaryLayout>
      <ConfigContentsLayout>
        <InputStyleSkeleton label='프로젝트 이름' />
        <InputStyleSkeleton label='프로젝트 주제' />
        <div className='row-span-2'>
          <div className='w-[380px] tablet:w-full space-y-10 mobile:mx-auto'>
            <InputStyleSkeleton label='시작 날짜' />
            <InputStyleSkeleton label='종료 날짜' />
          </div>
        </div>
        <InputStyleSkeleton label='기술 스택' />
      </ConfigContentsLayout>
    </ConfigLayout>
  );
};

export default ProjectConfigFormSkeleton;
