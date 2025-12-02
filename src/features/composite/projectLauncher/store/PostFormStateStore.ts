import { atom, DefaultValue, selectorFamily } from 'recoil';
import { CreatePostInput } from '@/features/core/post/api/createPost';

interface CreatePostFormData extends Omit<CreatePostInput, 'positionIds'> {
  positionIds: readonly string[];
}

export const postFormStateStore = atom<CreatePostFormData>({
  key: 'postFormStateStore',
  default: {
    title: '',
    content: '',
    contact: '',
    positionIds: [],
  },
});

export const postFormFieldSelector = <K extends keyof CreatePostFormData>(
  key: K,
): ReturnType<typeof postFormFieldSelectorFamily<K>> => {
  return postFormFieldSelectorFamily<K>(key);
};

const postFormFieldSelectorFamily = <K extends keyof CreatePostFormData>(
  key: K,
) =>
  selectorFamily<CreatePostFormData[K], K>({
    key: 'postFormFieldSelectorFamily',
    get:
      (param) =>
      ({ get }) => {
        const state = get(postFormStateStore);
        return state[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(postFormStateStore);
        set(postFormStateStore, { ...prev, [param]: newValue });
      },
  })(key);
