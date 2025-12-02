import { atom } from 'recoil';
import { NOTICE_TABS } from '@/features/core/projectNotice/constants/noticeTabs';
import { NoticeTab } from '@/features/core/projectNotice/types/noticeTab';

const { NTAB001: RCVOTE_NOTICE_TAB } = NOTICE_TABS;

export const activeNoticeTabStateStore = atom<NoticeTab>({
  key: 'activeNoticeTabStateStore',
  default: RCVOTE_NOTICE_TAB,
});
