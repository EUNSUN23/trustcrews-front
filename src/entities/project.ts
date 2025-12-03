import { TechStackData } from '@/entities/techStack';

export type Project = {
  projectId: bigint;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyStacks: TechStackData[];
};
