import { TechStackData } from '@/shared/model/techStack/techStackData';

export type ProjectData = {
  projectId: bigint;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyStacks: TechStackData[];
};
