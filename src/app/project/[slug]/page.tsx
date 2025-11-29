'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from '@/store/projectDetail/ProjectIdStateStore';
import dynamic from 'next/dynamic';
import ProjectDetailContainerSkeleton from '@/features/projectDetail/ui/ProjectDetailContainerSkeleton';

const ProjectDetail = dynamic(
  () => import('@/features/projectDetail/ui/ProjectDetailContainer'),
  { ssr: false, loading: () => <ProjectDetailContainerSkeleton /> },
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
    return <ProjectDetailContainerSkeleton />;

  return <ProjectDetail />;
};

export default ProjectPage;
