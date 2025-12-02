import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';
import { TaskPointType } from '@/features/core/taskHistory/types/taskPointType';
import { CrewStatusKey } from '@/features/core/crews/types/crewStatusKey';

export interface TaskHistory {
  taskId: bigint;
  trustScoreHistoryId: bigint;
  summary: string;
  createDate: string;
  progressStatus: CrewStatusKey;
  point: number;
  pointType: TaskPointType;
}

export const getTaskHistory = async (
  crewId: bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<TaskHistory[]>> => {
  return await request(
    'GET',
    `/api/projectCrew/auth/taskHistory?crewId=${crewId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const TASK_HISTORY_KEY = 'crewTaskHistory';

export const useTaskHistory = (crewId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: [
      TASK_HISTORY_KEY,
      crewId,
      pageIndex,
      ITEM_COUNT_PER_PAGE.LIST_SM,
    ],
    queryFn: () => getTaskHistory(crewId, pageIndex, PAGE_RANGE.DEFAULT),
  });
};
