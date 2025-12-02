import { atom } from 'recoil';

interface MyProjectAppliesModalState {
  isOpen: boolean;
}

export const myProjectAppliesModalStateStore = atom<MyProjectAppliesModalState>(
  {
    key: 'myProjectAppliesModalState',
    default: {
      isOpen: false,
    },
  },
);
