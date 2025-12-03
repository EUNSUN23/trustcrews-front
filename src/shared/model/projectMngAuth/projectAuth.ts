import { PM_AUTH_CODE } from '@/shared/model/projectMngAuth/pmAuthCode';

export type ProjectAuthCode = (typeof PM_AUTH_CODE)[keyof typeof PM_AUTH_CODE];

export type ProjectAuthMap = {
  code: ProjectAuthCode;
  name: string;
  workChangeYN: boolean;
  milestoneChangeYN: boolean;
  configYn: boolean;
};
