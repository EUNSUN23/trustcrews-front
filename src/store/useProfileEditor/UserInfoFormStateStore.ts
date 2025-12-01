import { UserInfoInput } from '@/features/user/api/updateUserDetail';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

interface UserInfoFormData
  extends Omit<UserInfoInput, 'positionId' | 'techStackIds'> {
  positionId: string;
  techStackIds: string[];
}

type UserInfoFormState = {
  isFormLoading: boolean;
  data: UserInfoFormData;
};

export const userInfoFormStateStore = atom<UserInfoFormState>({
  key: 'userInfoFormStateStore',
  default: {
    isFormLoading: true,
    data: {
      nickname: '',
      isCheckedNickname: false,
      positionId: '0',
      techStackIds: [],
      intro: '',
    },
  },
});

export const userInfoFormLoadingSelector = selector<boolean>({
  key: 'userInfoFormLoadingSelector',
  get: ({ get }) => {
    const state = get(userInfoFormStateStore);
    return state['isFormLoading'];
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const state = get(userInfoFormStateStore);
    set(userInfoFormStateStore, {
      ...state,
      isFormLoading: newValue,
    });
  },
});

export const userInfoFormFieldSelector = <K extends keyof UserInfoFormData>(
  key: K,
): ReturnType<typeof userInfoFormFieldSelectorFamily<K>> => {
  return userInfoFormFieldSelectorFamily<K>(key);
};

const userInfoFormFieldSelectorFamily = <K extends keyof UserInfoFormData>(
  key: K,
) =>
  selectorFamily<UserInfoFormData[K], K>({
    key: 'userInfoFormFieldSelectorFamily',
    get:
      (param) =>
      ({ get }) => {
        const state = get(userInfoFormStateStore)['data'];
        return state[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const state = get(userInfoFormStateStore);
        set(userInfoFormStateStore, {
          ...state,
          data: { ...state['data'], [param]: newValue },
        });
      },
  })(key);
