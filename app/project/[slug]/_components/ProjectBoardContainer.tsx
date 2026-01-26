import { ReactNode, Suspense, useEffect } from 'react';
import ProjectInfoSkeleton from './projectInfo/ProjectInfoSkeleton';
import ProjectInfo from './projectInfo';
import ProjectBoardNavTab from './ProjectBoardNavTab';
import {
  DEFAULT_PM_AUTH,
  projectManageAuthStateStore,
} from '../../_store/ProjectManageAuthStateStore';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { projectIdState } from '../../_store/ProjectIdStateStore';
import { useMyPMAuth } from '@/features/core/projectAuth/api/getMyPMAuth';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '../../_store/ProjectNavTabStateStore';
import ProjectJobContainerSkeleton from '@/features/composite/projectJob/ui/ProjectJobContainerSkeleton';
import ProjectJobContainer from '@/features/composite/projectJob/ui/ProjectJobContainer';
import CrewListContainerSkeleton from '@/features/composite/projectCrew/ui/crewList/CrewListContainerSkeleton';
import { ProjectNoticeBoard } from './projectNoticeBoard';
import { ProjectNoticeBoardSkeleton } from './projectNoticeBoard/ProjectNoticeBoardSkeleton';
import ProjectConfigBoard from './projectConfigBoard';
import ProjectConfigBoardSkeleton from './projectConfigBoard/ProjectConfigBoardSkeleton';
import { ApplicationError } from '@/lib/error/ApplicationError';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import ProjectBoardContainerSkeleton from './ProjectBoardContainerSkeleton';
import ProjectCrewsBoard from './projectCrewsBoard';
import { ProjectCrewDetailBoard } from './projectCrewDetailBoard';

const {
  TASK: { value: PROJECT_TASK },
  CREWS: {
    value: PROJECT_CREWS,
    child: {
      CREW_DETAIL: { value: PROJECT_CREW_DETAIL },
    },
  },
  NOTICE: { value: PROJECT_NOTICE },
  SETTING: { value: PROJECT_SETTING },
} = PROJECT_MENU;

const { code: DEFAULT_AUTH } = DEFAULT_PM_AUTH;

const ProjectBoardContainer = () => {
  const projectId = useRecoilValue(projectIdState);
  const [pmAuth, setPMAuth] = useRecoilState(projectManageAuthStateStore);
  const resetPMAuth = useResetRecoilState(projectManageAuthStateStore);

  const {
    data: { data: pmAuthData },
  } = useMyPMAuth(projectId);

  useEffect(() => {
    setPMAuth(pmAuthData);

    return () => {
      resetPMAuth();
    };
  }, [setPMAuth, pmAuthData, resetPMAuth]);

  const activeNavTab = useRecoilValue(projectActiveNavState);

  if (pmAuth.code === DEFAULT_AUTH) return <ProjectBoardContainerSkeleton />;

  let contents: ReactNode;

  let suspenseFallback: ReactNode = null;
  switch (activeNavTab) {
    case PROJECT_TASK:
      contents = (
        <ProjectJobContainer
          projectId={projectId}
          userPMAuthCode={pmAuthData.code}
        />
      );
      suspenseFallback = <ProjectJobContainerSkeleton />;
      break;
    case PROJECT_CREWS:
      contents = <ProjectCrewsBoard projectId={projectId} />;
      suspenseFallback = <CrewListContainerSkeleton />;
      break;
    case PROJECT_CREW_DETAIL:
      contents = <ProjectCrewDetailBoard />;
      break;
    case PROJECT_NOTICE:
      contents = <ProjectNoticeBoard />;
      suspenseFallback = <ProjectNoticeBoardSkeleton />;
      break;
    case PROJECT_SETTING:
      contents = <ProjectConfigBoard />;
      suspenseFallback = <ProjectConfigBoardSkeleton />;
      break;
    default:
      throw new ApplicationError(`Unknown Project NavTab: ${activeNavTab}`);
  }

  return (
    <>
      <Suspense fallback={<ProjectInfoSkeleton />}>
        <ProjectInfo />
      </Suspense>
      <ProjectBoardNavTab />
      <FieldQueryBoundary
        errorFallbackSize='lg'
        suspenseFallback={suspenseFallback}
      >
        {contents}
      </FieldQueryBoundary>
    </>
  );
};

export default ProjectBoardContainer;
