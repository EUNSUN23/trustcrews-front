import { atom, DefaultValue, selectorFamily } from 'recoil';
import { SignUpInput } from '@/features/core/auth/signUp/api/signUp';

interface SignUpFormState
  extends Omit<SignUpInput, 'positionId' | 'techStackIds' | 'intro'> {
  positionId: string;
  techStackIds: string[];
  intro: string;
}

const DEFAULT_SIGNUP_FORM: SignUpFormState = {
  email: '',
  password: { init: '', confirm: '' },
  nickname: '',
  isCheckedNickname: false,
  positionId: '',
  techStackIds: [],
  intro: '',
};

export const signUpFormStateStore = atom<SignUpFormState>({
  key: 'signUpFormStateStore',
  default: DEFAULT_SIGNUP_FORM,
});

export const signUpFormFieldSelector = <K extends keyof SignUpFormState>(
  key: K,
): ReturnType<typeof signUpFormFieldSelectorFamily<K>> => {
  return signUpFormFieldSelectorFamily<K>(key);
};

const signUpFormFieldSelectorFamily = <K extends keyof SignUpFormState>(
  key: K,
) =>
  selectorFamily<SignUpFormState[K], K>({
    key: 'signUpFormFieldSelectorFamily',
    get:
      (param) =>
      ({ get }) => {
        const state = get(signUpFormStateStore);
        return state[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const prev = get(signUpFormStateStore);
        set(signUpFormStateStore, { ...prev, [param]: newValue });
      },
  })(key);
