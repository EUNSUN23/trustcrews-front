import { NOTICE_TABS } from '@/features/core/projectNotice/constants/noticeTabs';

export type NoticeTab = (typeof NOTICE_TABS)[keyof typeof NOTICE_TABS];
