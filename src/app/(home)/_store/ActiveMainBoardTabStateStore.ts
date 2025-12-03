import { atom } from 'recoil';

export const MAIN_BOARD_TABS = {
  BM_TAB001: { desc: '프로젝트 모집', code: 'BM_TAB001' },
  BM_TAB002: { desc: '프로젝트 관리', code: 'BM_TAB002' },
} as const;

export const activeMainBoardTabStore = atom<string>({
  key: 'activeMainBoardTabStore',
  default: MAIN_BOARD_TABS.BM_TAB001.code,
});
