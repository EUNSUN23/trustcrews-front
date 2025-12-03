import { NOTICE_TABS } from '@/shared/model/projectNoticeTab/noticeTabs';

export type NoticeTab = (typeof NOTICE_TABS)[keyof typeof NOTICE_TABS];
