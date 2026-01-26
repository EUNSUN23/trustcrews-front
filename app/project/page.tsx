'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from './_store/ProjectIdStateStore';
import dynamic from 'next/dynamic';
import ProjectBoardContainerSkeleton from './[slug]/_components/ProjectBoardContainerSkeleton';

const ProjectBoardContainer = dynamic(
  () => import('./[slug]/_components/ProjectBoardContainer'),
  { ssr: false, loading: () => <ProjectBoardContainerSkeleton /> },
);

const ProjectPage = ({
  params: { slug: projectId },
}: {
  params: { slug: string };
}) => {
  const [currentProjectId, setCurrentProjectId] =
    useRecoilState(projectIdState);

  useEffect(() => {
    setCurrentProjectId(projectId);
  }, [setCurrentProjectId, projectId]);

  if (currentProjectId === DEFAULT_PROJECT_ID)
    return <ProjectBoardContainerSkeleton />;

  return <ProjectBoardContainer />;
};

export default ProjectPage;
