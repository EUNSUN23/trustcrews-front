import { useSetRecoilState } from 'recoil';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '../../../_store/ProjectNavTabStateStore';
import { useTransition } from 'react';
import { crewIdState } from '../../../_store/CrewIdStateStore';
import CrewListContainer from '@/features/composite/projectCrew/ui/crewList/CrewListContainer';

const {
  CREWS: {
    child: {
      CREW_DETAIL: { value: PROJECT_CREW_DETAIL },
    },
  },
} = PROJECT_MENU;

type ProjectCrewsBoardProps = {
  projectId: string;
};

const ProjectCrewsBoard = ({ projectId }: ProjectCrewsBoardProps) => {
  const setActiveNavTab = useSetRecoilState(projectActiveNavState);
  const setCrewIdState = useSetRecoilState(crewIdState);
  const [_, startTransition] = useTransition();

  const handleClickCrew = (crewId: bigint) => {
    startTransition(() => {
      setActiveNavTab(PROJECT_CREW_DETAIL);
    });
    setCrewIdState(crewId);
  };

  return (
    <CrewListContainer
      projectId={projectId}
      onClickCrewCallback={handleClickCrew}
    />
  );
};

export default ProjectCrewsBoard;
