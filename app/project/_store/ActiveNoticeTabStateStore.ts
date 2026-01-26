import { atom } from 'recoil';
import {
  PROJECT_NOTICE_TABS,
  ProjectNoticeTabType,
} from '@/entities/projectNoticeTabType';

const { NTAB001: RCVOTE_NOTICE_TAB } = PROJECT_NOTICE_TABS;

export const activeNoticeTabStateStore = atom<ProjectNoticeTabType>({
  key: 'activeNoticeTabStateStore',
  default: RCVOTE_NOTICE_TAB,
});
