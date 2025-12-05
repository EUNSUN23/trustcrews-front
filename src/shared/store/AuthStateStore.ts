import { atom } from 'recoil';

type AuthState = {
  isAuthorized: boolean;
  userId: string;
};

export const authStateStore = atom<AuthState>({
  key: 'authStateStore',
  default: { isAuthorized: false, userId: '' },
});
