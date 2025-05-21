import { PM_AUTH_CODE } from '@/entities/pmAuth/constants/pmAuthCode';

export type ProjectAuthCode = (typeof PM_AUTH_CODE)[keyof typeof PM_AUTH_CODE];

export type ProjectAuthMap = {
  code: ProjectAuthCode;
  name: string;
  workChangeYN: boolean;
  milestoneChangeYN: boolean;
  configYn: boolean;
};
