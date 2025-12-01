import { format } from 'date-fns';
import Link from 'next/link';
import TechStackImage from '@/features/techStack/ui/TechStackImage';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { ProjectInfoSummary } from '@/features/project/api/getProjectInfoSummary';

interface ProjectCardProps {
  data: ProjectInfoSummary;
}

const ProjectCard = ({ data }: ProjectCardProps) => {
  const {
    projectId,
    projectName,
    projectSubject,
    startDate,
    endDate,
    technologyStacks,
  } = data;

  return (
    <article className='p-4'>
      <div className='flex mb-[16px]'>
        <span className='sr-only'>프로젝트 이름:</span>
        <span className='inline-block mr-3 font-bold text-xl'>
          {projectName}
        </span>
      </div>
      <div className='my-2 flex items-center text-base text-gray-600 font-medium'>
        <span className='basis-[50px] text-gray-500 font-semibold'>기간</span>
        <span className='sr-only'>시작날짜:</span>
        <time
          className='inline-block mr-1 '
          dateTime={`${format(new Date(startDate), 'yyyy-MM-dd')}`}
        >
          {`${format(new Date(startDate), 'yyyy-MM-dd')}`}
        </time>
        <span className='text-sm' aria-hidden={true}>
          &#126;
        </span>
        <span className='sr-only'>종료날짜:</span>
        <time
          className='inline-block ml-1'
          dateTime={`${format(new Date(endDate), 'yyyy-MM-dd')}`}
        >
          {format(new Date(endDate), 'yyyy-MM-dd')}
        </time>
      </div>
      <div className='relative my-3 flex items-start'>
        <span className='basis-[50px] text-base text-gray-500 font-semibold'>
          주제
        </span>
        <div className='group'>
          <div className='max-w-[180px] truncate text-lg font-semibold'>
            {projectSubject}
          </div>
          <div
            id='tooltip-subject'
            role='tooltip'
            className='customTooltip group-hover:visible'
          >
            {projectSubject}
          </div>
        </div>
      </div>
      <div className='my-2 flex items-center space-x-3'>
        <span className='basis-[50px] text-gray-500 font-bold'>기술스택</span>
        <ul className='flex items-center space-x-1 basis-[180px]'>
          {technologyStacks
            .slice(0, 5)
            .map(({ techStackId, techStackName }) => (
              <li key={techStackId}>
                <TechStackImage
                  key={techStackId}
                  stackName={techStackName}
                  width={30}
                  height={30}
                />
              </li>
            ))}
        </ul>
        {technologyStacks.length > 5 && (
          <div className='flex items-center space-x-2'>
            <FaPlusCircle />
            <span className='pt-1 leading-none text-greyDarkblue/80 font-semibold'>
              {technologyStacks.length - 5}
            </span>
          </div>
        )}
      </div>
      <div className='flex justify-center mt-5 mb-3'>
        <Link
          href={`/project/${projectId}`}
          className='mobile:py-1 tablet:py-1.5 mobile:px-3 tablet:px-3.5 mobile:text-sm tablet:text-base text-white rounded-full font-semibold shadow-sm bg-primary'
          aria-label={`${projectName} 페이지로 이동`}
        >
          프로젝트로 이동
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
