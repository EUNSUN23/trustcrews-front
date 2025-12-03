export const TASK_STATUS = {
  PS001: {
    code: 'PS001',
    name: '시작전',
  },
  PS002: {
    code: 'PS002',
    name: '진행중',
  },
  PS003: {
    code: 'PS003',
    name: '완료',
  },
} as const;

export type TaskStatusKey = keyof typeof TASK_STATUS;
export type TaskStatus = (typeof TASK_STATUS)[TaskStatusKey];
export type TaskStatusCode = (typeof TASK_STATUS)[TaskStatusKey]['code'];
