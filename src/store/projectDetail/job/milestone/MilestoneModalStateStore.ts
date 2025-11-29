import { CreateMilestoneInput } from '@/features/milestone/api/createMilestone';
import { atom, DefaultValue, selectorFamily } from 'recoil';
import { UpdateMilestoneInput } from '@/features/milestone/api/updateMilestone';
import { ModalState } from '@/shared/types/modalState';

export const milestoneAddModalStateStore = atom<ModalState>({
  key: 'milestoneAddModalStateStore',
  default: {
    isOpen: false,
    title: '마일스톤 추가',
  },
});

const DEFAULT_ADD_MILESTONE_DATA = {
  startDate: '',
  endDate: '',
  content: '',
} as const;

export const milestoneAddFormStateStore = atom<CreateMilestoneInput>({
  key: 'milestoneAddDataStateStore',
  default: DEFAULT_ADD_MILESTONE_DATA,
});

export const milestoneAddFormFieldSelector = <
  K extends keyof CreateMilestoneInput,
>(
  key: K,
): ReturnType<typeof milestoneAddFormFieldSelectorFamily<K>> => {
  return milestoneAddFormFieldSelectorFamily<K>(key);
};

const milestoneAddFormFieldSelectorFamily = <
  K extends keyof CreateMilestoneInput,
>(
  key: K,
) =>
  selectorFamily<CreateMilestoneInput[K], K>({
    key: 'milestoneAddFormFieldSelectorFamily',
    get:
      (param) =>
      ({ get }) => {
        const state = get(milestoneAddFormStateStore);
        return state[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const state = get(milestoneAddFormStateStore);
        set(milestoneAddFormStateStore, { ...state, [param]: newValue });
      },
  })(key);

interface MilestoneModModalState extends ModalState {
  milestoneId: string;
  updateDate: string;
}

export const milestoneModModalStateStore = atom<MilestoneModModalState>({
  key: 'milestoneModModalStateStore',
  default: {
    isOpen: false,
    title: '마일스톤 수정',
    milestoneId: '0',
    updateDate: '',
  },
});

export type MilestoneModDataKey = keyof UpdateMilestoneInput;

const DEFAULT_MOD_MILESTONE_DATA: UpdateMilestoneInput = {
  startDate: '',
  endDate: '',
  content: '',
};

export const milestoneModFormStateStore = atom<UpdateMilestoneInput>({
  key: 'milestoneModDataStateStore',
  default: DEFAULT_MOD_MILESTONE_DATA,
});

export const milestoneModFormFieldSelector = <
  K extends keyof UpdateMilestoneInput,
>(
  key: K,
): ReturnType<typeof milestoneModFormFieldSelectorFamily<K>> => {
  return milestoneModFormFieldSelectorFamily<K>(key);
};

const milestoneModFormFieldSelectorFamily = <
  K extends keyof UpdateMilestoneInput,
>(
  key: K,
) =>
  selectorFamily<UpdateMilestoneInput[K], K>({
    key: 'milestoneModDataStateSelector',
    get:
      (param) =>
      ({ get }) => {
        const state = get(milestoneModFormStateStore);
        return state[param];
      },
    set:
      (param: MilestoneModDataKey) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const state = get(milestoneModFormStateStore);
        set(milestoneModFormStateStore, { ...state, [param]: newValue });
      },
  })(key);
