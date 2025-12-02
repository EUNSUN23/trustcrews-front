import { atom } from 'recoil';
import { ModalState } from '@/shared/types/modalState';
import { CreateCrewFWVoteReason } from '@/features/core/projectVote/api/createFWVote';

export type CrewFWModalState = ModalState & {
  projectId: string;
  crewId: string;
  crewPMAuth: string;
  userPMAuth: string;
};

export const DEFAULT_FW_MODAL_STATE: CrewFWModalState = {
  isOpen: false,
  title: '강제탈퇴 투표 신청',
  projectId: '0',
  crewId: '0',
  crewPMAuth: '',
  userPMAuth: '',
};

export const crewFWModalStateStore = atom<CrewFWModalState>({
  key: 'crewFWModalStateStore',
  default: DEFAULT_FW_MODAL_STATE,
});

export const crewFWModalDataStateStore = atom<CreateCrewFWVoteReason>({
  key: 'crewFWModalDataStateStore',
  default: {
    reason: '',
  },
});
