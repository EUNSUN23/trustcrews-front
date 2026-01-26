import { atom } from 'recoil';
import { ProjectAuth } from '@/entities/projectAuth';

interface ProjectManageAuthState extends Omit<ProjectAuth, 'code'> {
  code: string;
}

export const DEFAULT_PM_AUTH = {
  code: '',
  name: '',
  workChangeYN: false,
  milestoneChangeYN: false,
  configYn: false,
} as const;

export const projectManageAuthStateStore = atom<ProjectManageAuthState>({
  key: 'projectManageAuthStateStore',
  default: DEFAULT_PM_AUTH,
});
