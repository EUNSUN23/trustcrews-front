import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TASK_STATUS } from '@/constants/data/projectDetail/job/task/taskStatus';
import { TaskStatus } from '@/types/data/projectDetail/job/task';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';

export type TasksReqParam = {
  projectId: bigint;
  milestoneId: bigint;
  itemsPerPage: number;
  pageNumber: number;
};

export type TaskItem = {
  taskId: bigint;
  projectId: bigint;
  milestoneId: bigint;
  assignedUser: { crewId: bigint; nickname: string };
  lastModifiedMemberNickname: string;
  summary: string;
  startDate: string;
  endDate: string;
  progressStatus: TaskStatus;
  todo: string | '';
};

export const getTaskList = async (tasksReqParam: TasksReqParam) => {
  const { PS001: TASK_WAIT, PS002: TASK_PROCESSING } = TASK_STATUS;

  const {
    milestoneId,
    projectId,
    pageNumber: pageIndex,
    itemsPerPage: itemCount,
  } = tasksReqParam;

  const res: PageResponseBody<TaskItem[]> = await request(
    'GET',
    `/api/projectJobs/auth/task?milestoneId=${milestoneId}&projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const updated = res.data.content.map((v) => {
    if (v.progressStatus.name === '완료') {
      return v;
    } else {
      const startDate = v.startDate.replaceAll('-', '');
      const y = parseInt(startDate.substring(0, 4), 10);
      const m = parseInt(startDate.substring(5, 6), 10) - 1;
      const d = parseInt(startDate.substring(6, 8), 10);
      const date = new Date(y, m, d);

      if (date > today) {
        return { ...v, progressStatus: TASK_WAIT };
      } else {
        return { ...v, progressStatus: TASK_PROCESSING };
      }
    }
  });

  return {
    ...res,
    data: {
      content: updated,
      totalPages: res.data.totalPages,
    },
  };
};

export const TASKS_QUERY_KEY = 'taskList';

export const useTasks = ({
  projectId,
  milestoneId,
  pageNumber = 0,
}: {
  projectId: bigint;
  milestoneId: bigint;
  pageNumber?: number;
}) => {
  return useSuspenseQuery({
    queryKey: [
      TASKS_QUERY_KEY,
      bigIntToString(milestoneId),
      bigIntToString(projectId),
      pageNumber,
    ],
    queryFn: () =>
      getTaskList({
        milestoneId,
        projectId,
        pageNumber,
        itemsPerPage: ITEM_COUNT_PER_PAGE.CARDS_SM,
      }),
  });
};

export default useTasks;
