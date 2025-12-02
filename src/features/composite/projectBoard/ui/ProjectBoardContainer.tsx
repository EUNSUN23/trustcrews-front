import { ReactNode, Suspense, useEffect } from 'react';
import ProjectInfoSkeleton from '@/features/composite/projectBoard/ui/projectInfo/ProjectInfoSkeleton';
import ProjectInfo from '@/features/composite/projectBoard/ui/projectInfo';
import ProjectBoardNavTab from '@/features/composite/projectBoard/ui/ProjectBoardNavTab';
import {
  DEFAULT_PM_AUTH,
  projectManageAuthStateStore,
} from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { useMyPMAuth } from '@/features/core/projectMngAuth/api/getMyPMAuth';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '@/store/projectDetail/ProjectNavTabStateStore';
import ProjectJobBoardSkeleton from '@/features/composite/projectBoard/ui/projectJobBoard/ProjectJobBoardSkeleton';
import ProjectJobBoard from '@/features/composite/projectBoard/ui/projectJobBoard';
import ProjectCrewsBoard from '@/features/composite/projectBoard/ui/projectCrewsBoard/crewList';
import CrewListSkeleton from '@/features/composite/projectBoard/ui/projectCrewsBoard/crewList/CrewListSkeleton';
import { ProjectCrewDetailBoard } from '@/features/composite/projectBoard/ui/projectCrewsBoard/crewDetail';
import { ProjectNoticeBoard } from '@/features/composite/projectBoard/ui/projectNoticeBoard';
import { ProjectNoticeBoardSkeleton } from '@/features/composite/projectBoard/ui/projectNoticeBoard/ProjectNoticeBoardSkeleton';
import ProjectConfigBoard from '@/features/composite/projectBoard/ui/projectConfigBoard';
import ProjectConfigBoardSkeleton from '@/features/composite/projectBoard/ui/projectConfigBoard/ProjectConfigBoardSkeleton';
import { ApplicationError } from '@/shared/utils/ApplicationError';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import ProjectBoardContainerSkeleton from '@/features/composite/projectBoard/ui/ProjectBoardContainerSkeleton';

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
      contents = <ProjectJobBoard />;
      suspenseFallback = <ProjectJobBoardSkeleton />;
      break;
    case PROJECT_CREWS:
      contents = <ProjectCrewsBoard />;
      suspenseFallback = <CrewListSkeleton />;
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
