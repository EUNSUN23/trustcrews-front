import { PROJECT_HISTORY_STATUS } from '@/shared/model/projectHistory/projectHistoryStatus';

export type ProjectHistoryStatusCode = keyof typeof PROJECT_HISTORY_STATUS;
export type ProjectHistoryStatusType =
  (typeof PROJECT_HISTORY_STATUS)[ProjectHistoryStatusCode];
