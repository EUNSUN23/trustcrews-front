'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from '@/store/projectDetail/ProjectIdStateStore';
import dynamic from 'next/dynamic';
import ProjectBoardContainerSkeleton from '@/features/projectBoard/ui/ProjectBoardContainerSkeleton';

const ProjectDetail = dynamic(
  () => import('@/features/projectBoard/ui/ProjectBoardContainer'),
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

  return <ProjectDetail />;
};

export default ProjectPage;
