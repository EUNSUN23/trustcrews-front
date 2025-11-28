'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  DEFAULT_PROJECT_ID,
  projectIdState,
} from '@/store/projectDetail/ProjectIdStateStore';
import dynamic from 'next/dynamic';
import ProjectDetailSkeleton from '@/features/projectPage/ui/projectDetail/ProjectDetailSkeleton';

const ProjectDetail = dynamic(
  () => import('@/features/projectPage/ui/projectDetail'),
  { ssr: false, loading: () => <ProjectDetailSkeleton /> },
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

  if (currentProjectId === DEFAULT_PROJECT_ID) return <ProjectDetailSkeleton />;

  return <ProjectDetail />;
};

export default ProjectPage;
