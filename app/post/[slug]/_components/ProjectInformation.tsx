'use client';

import TechStackImage from '@/features/core/techStack/ui/TechStackImage';
import { Project } from '@/entities/project';

type ProjectPublicInfoProps = {
  projectInfo: Project;
};

const ProjectInformation = ({ projectInfo }: ProjectPublicInfoProps) => {
  const { projectName, projectSubject, startDate, endDate, technologyStacks } =
    projectInfo;
  return (
    <article className='grid grid-cols-2 gap-y-8 mobile:grid-cols-1 mobile:gap-y-0 mobile:text-sm'>
      <h2 className='sr-only'>프로젝트 정보</h2>
      <div
        role='group'
        aria-label='프로젝트 이름'
        className='flex gap-5 items-center break-words min-h-10'
      >
        <h3 className='text-grey800 w-[110px] mobile:w-[80px] text-xl mobile:text-sm whitespace-nowrap font-bold'>
          프로젝트 이름
        </h3>
        <p className='w-[calc(100%-130px)] line-clamp-2'>{projectName}</p>
      </div>
      <div
        role='group'
        aria-label='시작 날짜'
        className='flex gap-5 items-center min-h-10'
      >
        <h3 className='text-grey800 w-[110px] mobile:w-[80px] text-xl mobile:text-sm whitespace-nowrap font-bold'>
          시작 날짜
        </h3>
        <p className='w-[calc(100%-110px)]'>{startDate}</p>
      </div>
      <div
        role='group'
        aria-label='프로젝트 주제'
        className='flex gap-5 items-center break-words min-h-10'
      >
        <h3 className='text-grey800 w-[110px] mobile:w-[80px] text-xl mobile:text-sm whitespace-nowrap font-bold'>
          프로젝트 주제
        </h3>
        <p className='w-[calc(100%-130px)] line-clamp-2'>{projectSubject}</p>
      </div>
      <div
        role='group'
        aria-label='종료 날짜'
        className='flex gap-5 items-center min-h-10'
      >
        <h3 className='text-grey800 w-[110px] mobile:w-[80px]  text-xl mobile:text-sm whitespace-nowrap font-bold'>
          종료 날짜
        </h3>
        <p>{endDate}</p>
      </div>
      <div
        role='group'
        aria-label='기술 스택'
        className='flex gap-5 items-center min-h-10'
      >
        <h3 className='text-grey800 w-[110px] mobile:w-[80px]  text-xl mobile:text-sm whitespace-nowrap font-bold'>
          기술 스택
        </h3>
        <ul className='flex gap-1 w-[calc(100%-130px)] overflow-auto'>
          {technologyStacks.map((stack) => (
            <TechStackImage
              key={stack.techStackId.toString()}
              stackName={stack.techStackName}
              width={32}
              height={32}
            />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectInformation;
