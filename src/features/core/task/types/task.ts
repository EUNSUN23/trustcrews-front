import { TASK_STATUS } from '@/features/core/task/constants/taskStatus';

export type TaskStatusKey = keyof typeof TASK_STATUS;
export type TaskStatus = (typeof TASK_STATUS)[TaskStatusKey];
export type TaskStatusCode = (typeof TASK_STATUS)[TaskStatusKey]['code'];
