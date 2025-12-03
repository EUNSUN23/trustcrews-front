import Skeleton from '@/shared/ui/skeleton/Skeleton';
import ProjectInfoSkeleton from '@/app/project/[slug]/_components/projectInfo/ProjectInfoSkeleton';
import { useRecoilValue } from 'recoil';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '@/app/project/[slug]/_store/ProjectNavTabStateStore';
import ProjectJobContainerSkeleton from '@/features/composite/projectJob/ui/ProjectJobContainerSkeleton';
import CrewListContainerSkeleton from '@/features/composite/projectCrew/ui/crewList/CrewListContainerSkeleton';
import { ProjectNoticeBoardSkeleton } from '@/app/project/[slug]/_components/projectNoticeBoard/ProjectNoticeBoardSkeleton';
import ProjectConfigBoardSkeleton from '@/app/project/[slug]/_components/projectConfigBoard/ProjectConfigBoardSkeleton';
import { ApplicationError } from '@/lib/error/ApplicationError';
import { ReactNode } from 'react';

const {
  TASK: { value: PROJECT_TASK },
  CREWS: { value: PROJECT_CREWS },
  NOTICE: { value: PROJECT_NOTICE },
  SETTING: { value: PROJECT_SETTING },
} = PROJECT_MENU;

const ProjectBoardContainerSkeleton = () => {
  const activeNavTab = useRecoilValue(projectActiveNavState);
  let contentsSkeleton: ReactNode;

  switch (activeNavTab) {
    case PROJECT_TASK:
      contentsSkeleton = <ProjectJobContainerSkeleton />;
      break;
    case PROJECT_CREWS:
      contentsSkeleton = <CrewListContainerSkeleton />;
      break;
    case PROJECT_NOTICE:
      contentsSkeleton = <ProjectNoticeBoardSkeleton />;
      break;
    case PROJECT_SETTING:
      contentsSkeleton = <ProjectConfigBoardSkeleton />;
      break;
    default:
      throw new ApplicationError(`Unknown Project NavTab: ${activeNavTab}`);
  }

  return (
    <>
      <ProjectInfoSkeleton />
      <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
        <div className='border-b-[3px] border-grey300 pb-6'>
          <nav className='-mb-px flex tablet:space-x-10 mobile:justify-around'>
            {Object.values(PROJECT_MENU).map((v) => (
              <Skeleton
                key={v.name}
                sizeClassName='w-[90px] h-[45px] mobile:w-[60px] mobile:h-[40px] -mb-[1.8px] py-4 px-1 mobile:px-4'
              />
            ))}
          </nav>
        </div>
      </div>
      {contentsSkeleton}
    </>
  );
};

export default ProjectBoardContainerSkeleton;
