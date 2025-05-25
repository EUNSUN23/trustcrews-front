import { ReactNode, Suspense, useEffect } from 'react';
import ProjectInfoSkeleton from '@/features/projectDetail/projectInfo/contents/ProjectInfoSkeleton';
import ProjectInfo from '@/features/projectDetail/projectInfo/contents/ProjectInfo';
import ProjectNavTab from '@/features/projectDetail/ProjectNavTab';
import {
  DEFAULT_PM_AUTH,
  projectManageAuthStateStore,
} from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { useMyPMAuth } from '@/features/pmAuth/api/getMyPMAuth';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '@/store/projectDetail/ProjectNavTabStateStore';
import ProjectJobSkeleton from '@/features/projectDetail/job/contents/ProjectJobSkeleton';
import ProjectJob from '@/features/projectDetail/job/contents/ProjectJob';
import ProjectCrews from '@/features/projectDetail/crew/crews/contents/ProjectCrews';
import ProjectCrewsSkeleton from '@/features/projectDetail/crew/crews/contents/ProjectCrewsSkeleton';
import { ProjectCrewDetail } from '@/features/projectDetail/crew/crewDetail/ProjectCrewDetail';
import { ProjectNotice } from '@/features/projectDetail/notice/contents/ProjectNotice';
import { ProjectNoticeSkeleton } from '@/features/projectDetail/notice/contents/ProjectNoticeSkeleton';
import ProjectConfig from '@/features/projectDetail/config/contents/ProjectConfig';
import ProjectConfigSkeleton from '@/features/projectDetail/config/contents/ProjectConfigSkeleton';
import { ApplicationError } from '@/shared/utils/ApplicationError';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import ProjectDetailSkeleton from '@/features/projectDetail/ProjectDetailSkeleton';

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

const ProjectDetail = () => {
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

  if (pmAuth.code === DEFAULT_AUTH) return <ProjectDetailSkeleton />;

  let contents: ReactNode;

  let suspenseFallback: ReactNode = null;
  switch (activeNavTab) {
    case PROJECT_TASK:
      contents = <ProjectJob />;
      suspenseFallback = <ProjectJobSkeleton />;
      break;
    case PROJECT_CREWS:
      contents = <ProjectCrews />;
      suspenseFallback = <ProjectCrewsSkeleton />;
      break;
    case PROJECT_CREW_DETAIL:
      contents = <ProjectCrewDetail />;
      break;
    case PROJECT_NOTICE:
      contents = <ProjectNotice />;
      suspenseFallback = <ProjectNoticeSkeleton />;
      break;
    case PROJECT_SETTING:
      contents = <ProjectConfig />;
      suspenseFallback = <ProjectConfigSkeleton />;
      break;
    default:
      throw new ApplicationError(`Unknown Project NavTab: ${activeNavTab}`);
  }

  return (
    <>
      <Suspense fallback={<ProjectInfoSkeleton />}>
        <ProjectInfo />
      </Suspense>
      <ProjectNavTab />
      <FieldQueryBoundary
        errorFallbackSize='lg'
        suspenseFallback={suspenseFallback}
      >
        {contents}
      </FieldQueryBoundary>
    </>
  );
};

export default ProjectDetail;
