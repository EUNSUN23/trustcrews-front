export const NOTICE_TYPES = {
  PRA1001: { code: 'PRA1001', name: '투표', parent: null },
  PRA1002: { code: 'PRA1002', name: '모집', parent: 'PRA1001' },
  PRA1003: { code: 'PRA1003', name: '강제탈퇴', parent: 'PRA1001' },
  PRA2001: { code: 'PRA2001', name: '크루', parent: null },
  PRA3001: { code: 'PRA3001', name: '업무', parent: null },
} as const;
