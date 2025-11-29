import { NOTICE_TABS } from '@/features/projectNotice/constants/noticeTabs';

export type NoticeTab = (typeof NOTICE_TABS)[keyof typeof NOTICE_TABS];
