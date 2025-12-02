import { atom } from 'recoil';

export const crewIdState = atom<bigint>({
  key: 'crewIdState',
  default: 0n,
});
