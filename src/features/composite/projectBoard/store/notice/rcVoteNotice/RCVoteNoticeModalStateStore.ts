import { atom } from 'recoil';
import { ModalState } from '@/shared/types/modalState';

type RCVoteNoticeModalState = ModalState & {
  voteId: string;
  noticeId: string;
  applyId: string;
  userPMAuth: string;
};

export const rcVoteNoticeModalState = atom<RCVoteNoticeModalState>({
  key: 'rcVoteNoticeModalStateStore',
  default: {
    isOpen: false,
    title: '',
    voteId: '0',
    noticeId: '0',
    applyId: '0',
    userPMAuth: '',
  },
});
