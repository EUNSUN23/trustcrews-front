import { atom } from 'recoil';

export const DEFAULT_PROJECT_ID = '0';

export const projectIdState = atom<string>({
  key: 'projectIdState',
  default: DEFAULT_PROJECT_ID,
});
