import { ProjectHistoryStatus } from '@/features/core/projectHistory/types/projectHistoryStatus';

export type ProjectHistoryData = {
  userProjectHistoryId: bigint;
  projectId: bigint;
  status: ProjectHistoryStatus;
  projectName: string;
  updateDate: string;
};
