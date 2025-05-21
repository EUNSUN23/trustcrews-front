import { PROJECT_HISTORY_STATUS } from '@/entities/projectHistory/constants/projectHistoryStatus';

export type ProjectHistoryStatusCode = keyof typeof PROJECT_HISTORY_STATUS;
export type ProjectHistoryStatus =
  (typeof PROJECT_HISTORY_STATUS)[ProjectHistoryStatusCode];
