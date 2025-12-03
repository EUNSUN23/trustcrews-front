export const PM_AUTH_CODE = {
  MANAGER: 'PAUTH_1001',
  CREW: 'PAUTH_2001',
} as const;

export type ProjectAuthCode = (typeof PM_AUTH_CODE)[keyof typeof PM_AUTH_CODE];

export type ProjectAuth = {
  code: ProjectAuthCode;
  name: string;
  workChangeYN: boolean;
  milestoneChangeYN: boolean;
  configYn: boolean;
};
