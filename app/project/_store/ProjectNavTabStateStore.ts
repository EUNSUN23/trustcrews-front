import { atom } from 'recoil';

export const PROJECT_MENU = {
  TASK: {
    name: '업무',
    value: 'TASK',
  },
  CREWS: {
    name: '크루',
    value: 'CREWS',
    child: {
      CREW_DETAIL: {
        name: '크루 상세',
        value: 'CREW_DETAIL',
      },
    },
  },
  NOTICE: {
    name: '알림',
    value: 'NOTICE',
  },
  SETTING: {
    name: '프로젝트 설정',
    value: 'SETTING',
  },
} as const;
const {
  TASK: { value: PROJECT_TASK },
} = PROJECT_MENU;

export type ProjectMenu =
  | keyof typeof PROJECT_MENU
  | keyof (typeof PROJECT_MENU)['CREWS']['child'];

export const projectActiveNavState = atom<ProjectMenu>({
  key: 'projectActiveNavState',
  default: PROJECT_TASK,
});
