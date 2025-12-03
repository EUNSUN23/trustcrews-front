import { ProjectHistoryStatusType } from '@/shared/model/projectHistory/projectHistoryStatusType';

export type ProjectHistoryData = {
  userProjectHistoryId: bigint;
  projectId: bigint;
  status: ProjectHistoryStatusType;
  projectName: string;
  updateDate: string;
};
