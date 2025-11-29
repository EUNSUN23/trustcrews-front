import { GrScorecard } from '@react-icons/all-files/gr/GrScorecard';
import Index from '@/features/projectDetail/ui/projectCrewsBoard/crewDetail/crewTaskHistory';
import CrewFWCreateModal from '@/features/projectDetail/ui/projectCrewsBoard/crewDetail/crewProfile/CrewFWCreateModal';
import CrewProfileSkeleton from '@/features/projectDetail/ui/projectCrewsBoard/crewDetail/crewProfile/CrewProfileSkeleton';
import CrewTaskHistorySkeleton from '@/features/projectDetail/ui/projectCrewsBoard/crewDetail/crewTaskHistory/CrewTaskHistorySkeleton';
import CrewProfile from '@/features/projectDetail/ui/projectCrewsBoard/crewDetail/crewProfile';
import Button from '@/shared/ui/Button';
import { useSetRecoilState } from 'recoil';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '@/store/projectDetail/ProjectNavTabStateStore';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const {
  CREWS: { value: PROJECT_CREWS },
} = PROJECT_MENU;

export const ProjectCrewDetailBoard = () => {
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
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<CrewProfileSkeleton />}
        >
          <CrewProfile />
        </FieldQueryBoundary>
      </section>
      <section className='pc:w-[95%] tablet:w-[95%] mobile:min-w-[75%] mt-12 mobile:mt-6'>
        <div className='flex items-center pc:text-3xl tablet:text-2xl mobile:text-lg font-semibold text-greyDarkBlue'>
          <GrScorecard className='tablet:text-[1.5rem]' />
          <h3 className='ml-2'>업무 이력</h3>
        </div>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<CrewTaskHistorySkeleton />}
        >
          <Index />
        </FieldQueryBoundary>
      </section>
      <CrewFWCreateModal />
    </section>
  );
};
