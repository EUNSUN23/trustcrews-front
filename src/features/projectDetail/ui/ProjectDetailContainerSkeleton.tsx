import Skeleton from '@/shared/ui/skeleton/Skeleton';
import ProjectInfoSkeleton from '@/features/projectDetail/ui/projectInfo/ProjectInfoSkeleton';
import { useRecoilValue } from 'recoil';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '@/store/projectDetail/ProjectNavTabStateStore';
import ProjectJobBoardSkeleton from '@/features/projectDetail/ui/projectJobBoard/ProjectJobBoardSkeleton';
import CrewListSkeleton from '@/features/projectDetail/ui/projectCrewsBoard/crewList/CrewListSkeleton';
import { ProjectNoticeBoardSkeleton } from '@/features/projectDetail/ui/projectNoticeBoard/ProjectNoticeBoardSkeleton';
import ProjectConfigBoardSkeleton from '@/features/projectDetail/ui/projectConfigBoard/ui/ProjectConfigBoardSkeleton';
import { ApplicationError } from '@/shared/utils/ApplicationError';
import { ReactNode } from 'react';

const {
  TASK: { value: PROJECT_TASK },
  CREWS: { value: PROJECT_CREWS },
  NOTICE: { value: PROJECT_NOTICE },
  SETTING: { value: PROJECT_SETTING },
} = PROJECT_MENU;

const ProjectDetailContainerSkeleton = () => {
  const activeNavTab = useRecoilValue(projectActiveNavState);
  let contentsSkeleton: ReactNode;

  switch (activeNavTab) {
    case PROJECT_TASK:
      contentsSkeleton = <ProjectJobBoardSkeleton />;
      break;
    case PROJECT_CREWS:
      contentsSkeleton = <CrewListSkeleton />;
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

export default ProjectDetailContainerSkeleton;
