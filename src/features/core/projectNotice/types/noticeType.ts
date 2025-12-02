import { NOTICE_TYPES } from '@/features/core/projectNotice/constants/noticeTypes';

export type NoticeTypeCode = Exclude<
  keyof typeof NOTICE_TYPES,
  'PRA1001' | 'PRA3001'
>;
export type NoticeType = (typeof NOTICE_TYPES)[NoticeTypeCode];
