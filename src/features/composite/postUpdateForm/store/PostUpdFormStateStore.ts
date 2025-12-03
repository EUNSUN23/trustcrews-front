import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { UpdatePostInput } from '@/features/core/post/api/updatePost';

interface PostUpdFormData extends Omit<UpdatePostInput, 'positionIds'> {
  positionIds: readonly string[];
}

type PostUpdFormState = {
  isFormLoading: boolean;
  data: PostUpdFormData;
};

const DEFAULT_POST_UPD_FORM: PostUpdFormData = {
  title: '',
  content: '',
  recruitmentStatus: true,
  contact: '',
  positionIds: [],
};

export const postUpdFormStateStore = atom<PostUpdFormState>({
  key: 'postUpdFormStateStore',
  default: {
    isFormLoading: true,
    data: DEFAULT_POST_UPD_FORM,
  },
});

export const postUpdFormLoadingSelector = selector<boolean>({
  key: 'postConfigFormLoadingSelector',
  get: ({ get }) => {
    const state = get(postUpdFormStateStore);
    return state.isFormLoading;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const prev = get(postUpdFormStateStore);
    set(postUpdFormStateStore, { ...prev, isFormLoading: newValue });
  },
});

export const postUpdFormFieldSelector = <K extends keyof UpdatePostInput>(
  key: K,
): ReturnType<typeof postUpdFormFieldSelectorFamily<K>> => {
  return postUpdFormFieldSelectorFamily<K>(key);
};

const postUpdFormFieldSelectorFamily = <K extends keyof PostUpdFormData>(
  key: K,
) =>
  selectorFamily<PostUpdFormData[K], K>({
    key: 'postConfigFormFieldSelector',
    get:
      (param) =>
      ({ get }) => {
        const state = get(postUpdFormStateStore);
        return state.data[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(postUpdFormStateStore);
        set(postUpdFormStateStore, {
          ...prev,
          data: { ...prev.data, [param]: newValue },
        });
      },
  })(key);
