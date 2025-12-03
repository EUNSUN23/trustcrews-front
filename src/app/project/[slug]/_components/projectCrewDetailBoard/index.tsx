import { useRecoilValue, useSetRecoilState } from 'recoil';
import { crewIdState } from '@/app/project/[slug]/_store/CrewIdStateStore';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '@/app/project/[slug]/_store/ProjectNavTabStateStore';
import Button from '@/shared/ui/Button';
import { GrScorecard } from '@react-icons/all-files/gr/GrScorecard';
import CrewFWCreateModal from '@/features/composite/projectCrew/ui/crewOut/CrewFWCreateModal';
import CrewProfileContainer from '@/features/composite/projectCrew/ui/crewProfile/CrewProfileContainer';
import CrewTaskHistoryContainer from '@/features/composite/projectCrew/ui/crewTaskHistory/CrewTaskHistoryContainer';
import { projectManageAuthStateStore } from '@/app/project/[slug]/_store/ProjectManageAuthStateStore';
import { CrewOutContainer } from '@/features/composite/projectCrew/ui/crewOut/CrewOutContainer';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import CrewOutContainerSkeleton from '@/features/composite/projectCrew/ui/crewOut/CrewOutContainerSkeleton';

const {
  CREWS: { value: PROJECT_CREWS },
} = PROJECT_MENU;

export const ProjectCrewDetailBoard = () => {
  const crewId = useRecoilValue(crewIdState);
  const { code: userPMAuthCode } = useRecoilValue(projectManageAuthStateStore);
  const setProjectActiveNav = useSetRecoilState(projectActiveNavState);

  return (
    <section className='w-full flex flex-col items-center px-1 '>
      <section className='w-full flex items-center justify-start mb-12 mobile:mb-8'>
        <Button
          theme='primary'
          size='xl'
          onClick={() => setProjectActiveNav(PROJECT_CREWS)}
        >
          크루 목록
        </Button>
      </section>
      <section className='pc:min-h-[300px] tablet:py-3 border-b-2 border-gray-200'>
        <CrewProfileContainer crewId={crewId} />
      </section>
      <section className='pc:w-[95%] tablet:w-[95%] mobile:min-w-[75%] mt-12 mobile:mt-6'>
        <div className='flex items-center pc:text-3xl tablet:text-2xl mobile:text-lg font-semibold text-greyDarkBlue'>
          <GrScorecard className='tablet:text-[1.5rem]' />
          <h3 className='ml-2'>업무 이력</h3>
        </div>
        <CrewTaskHistoryContainer crewId={crewId} />
      </section>
      <FieldQueryBoundary suspenseFallback={<CrewOutContainerSkeleton />}>
        <CrewOutContainer crewId={crewId} userPMAuthCode={userPMAuthCode} />
      </FieldQueryBoundary>
      <CrewFWCreateModal />
    </section>
  );
};
