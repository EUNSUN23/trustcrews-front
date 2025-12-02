import { PROJECT_HISTORY_STATUS } from '@/features/core/projectHistory/constants/projectHistoryStatus';

export type ProjectHistoryStatusCode = keyof typeof PROJECT_HISTORY_STATUS;
export type ProjectHistoryStatus =
  (typeof PROJECT_HISTORY_STATUS)[ProjectHistoryStatusCode];
