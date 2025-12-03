export const PROJECT_NOTICE_TABS = {
  NTAB001: { code: 'NTAB001', name: '모집' },
  NTAB002: { code: 'NTAB002', name: '강제탈퇴' },
  NTAB003: { code: 'NTAB003', name: '크루' },
} as const;
export type ProjectNoticeTabType =
  (typeof PROJECT_NOTICE_TABS)[keyof typeof PROJECT_NOTICE_TABS];
