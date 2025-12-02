import { atom } from 'recoil';

type ActiveMilestoneState = {
  milestoneId: string;
  index: number;
  startDate: string;
  endDate: string;
};

export const DEFAULT_ACTIVE_MILESTONE = {
  milestoneId: '0',
  index: 0,
  startDate: '',
  endDate: '',
} as const;

export const activeMilestoneStateStore = atom<ActiveMilestoneState>({
  key: 'activeMilestoneStateStore',
  default: DEFAULT_ACTIVE_MILESTONE,
});
