import { atom, DefaultValue, selectorFamily } from 'recoil';
import { CreateProjectInput } from '@/features/core/project/api/createProject';

interface ProjectFormState extends Omit<CreateProjectInput, 'technologyIds'> {
  technologyIds: string[];
}

export const projectFormStateStore = atom<ProjectFormState>({
  key: 'projectFormStateStore',
  default: {
    name: '',
    subject: '',
    startDate: '',
    endDate: '',
    technologyIds: [],
  },
});

export const projectFormFieldSelector = <K extends keyof ProjectFormState>(
  key: K,
): ReturnType<typeof projectFormFieldSelectorFamily<K>> => {
  return projectFormFieldSelectorFamily<K>(key);
};

const projectFormFieldSelectorFamily = <K extends keyof ProjectFormState>(
  key: K,
) =>
  selectorFamily<ProjectFormState[K], K>({
    key: 'projectFormFieldSelectorFamily',
    get:
      (param) =>
      ({ get }) => {
        const state = get(projectFormStateStore);
        return state[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const data = get(projectFormStateStore);
        set(projectFormStateStore, { ...data, [param]: newValue });
      },
  })(key);
