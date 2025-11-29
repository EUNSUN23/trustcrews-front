import { ProjectHistoryStatus } from '@/features/projectHistory/types/projectHistoryStatus';

export type ProjectHistoryData = {
  userProjectHistoryId: bigint;
  projectId: bigint;
  status: ProjectHistoryStatus;
  projectName: string;
  updateDate: string;
};
