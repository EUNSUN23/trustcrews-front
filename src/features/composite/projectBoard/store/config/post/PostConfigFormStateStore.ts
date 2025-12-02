import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { UpdatePostConfigInput } from '@/features/core/post/api/generalConfig/updatePostConfig';

interface UpdatePostConfigFormData
  extends Omit<UpdatePostConfigInput, 'positionIds'> {
  positionIds: readonly string[];
}

type UpdatePostConfigFormState = {
  isFormLoading: boolean;
  data: UpdatePostConfigFormData;
};

const DEFAULT_POST_CONFIG_FORM: UpdatePostConfigFormData = {
  title: '',
  content: '',
  recruitmentStatus: true,
  contact: '',
  positionIds: [],
};

export const postConfigFormStateStore = atom<UpdatePostConfigFormState>({
  key: 'postConfigFormStateStore',
  default: {
    isFormLoading: true,
    data: DEFAULT_POST_CONFIG_FORM,
  },
});

export const postConfigFormLoadingSelector = selector<boolean>({
  key: 'postConfigFormLoadingSelector',
  get: ({ get }) => {
    const state = get(postConfigFormStateStore);
    return state.isFormLoading;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const prev = get(postConfigFormStateStore);
    set(postConfigFormStateStore, { ...prev, isFormLoading: newValue });
  },
});

export const postConfigFormFieldSelector = <
  K extends keyof UpdatePostConfigInput,
>(
  key: K,
): ReturnType<typeof postConfigFormFieldSelectorFamily<K>> => {
  return postConfigFormFieldSelectorFamily<K>(key);
};

const postConfigFormFieldSelectorFamily = <
  K extends keyof UpdatePostConfigFormData,
>(
  key: K,
) =>
  selectorFamily<UpdatePostConfigFormData[K], K>({
    key: 'postConfigFormFieldSelector',
    get:
      (param) =>
      ({ get }) => {
        const state = get(postConfigFormStateStore);
        return state.data[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(postConfigFormStateStore);
        set(postConfigFormStateStore, {
          ...prev,
          data: { ...prev.data, [param]: newValue },
        });
      },
  })(key);
