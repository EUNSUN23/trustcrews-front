import { atom } from 'recoil';
import { NOTICE_TABS } from '@/shared/model/projectNoticeTab/noticeTabs';
import { NoticeTab } from '@/shared/model/projectNoticeTab/noticeTab';

const { NTAB001: RCVOTE_NOTICE_TAB } = NOTICE_TABS;

export const activeNoticeTabStateStore = atom<NoticeTab>({
  key: 'activeNoticeTabStateStore',
  default: RCVOTE_NOTICE_TAB,
});
