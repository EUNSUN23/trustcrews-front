import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { UpdateProjectInfoInput } from '@/features/core/project/api/updateProjectInfo';

interface ProjectUpdFormData
  extends Omit<UpdateProjectInfoInput, 'technologyIds'> {
  technologyIds: string[];
}

type ProjectUpdFormState = {
  isFormLoading: boolean;
  data: ProjectUpdFormData;
};

const DEFAULT_PROJECT_UPD_FORM: ProjectUpdFormData = {
  projectName: '',
  projectSubject: '',
  startDate: '',
  endDate: '',
  technologyIds: [],
};

export const projectUpdFormStateStore = atom<ProjectUpdFormState>({
  key: 'projectUpdFormStateStore',
  default: {
    isFormLoading: true,
    data: DEFAULT_PROJECT_UPD_FORM,
  },
});

export const projectUpdFormLoadingSelector = selector<boolean>({
  key: 'projectUpdFormLoadingSelector',
  get: ({ get }) => {
    const state = get(projectUpdFormStateStore);
    return state.isFormLoading;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const prev = get(projectUpdFormStateStore);
    set(projectUpdFormStateStore, { ...prev, isFormLoading: newValue });
  },
});

export const projectUpdFormFieldSelector = <K extends keyof ProjectUpdFormData>(
  key: K,
): ReturnType<typeof projectUpdFormFieldSelectorFamily<K>> => {
  return projectUpdFormFieldSelectorFamily<K>(key);
};

const projectUpdFormFieldSelectorFamily = <K extends keyof ProjectUpdFormData>(
  key: K,
) =>
  selectorFamily<ProjectUpdFormData[K], K>({
    key: 'projectConfigFormFieldSelector',
    get:
      (param) =>
      ({ get }) => {
        const state = get(projectUpdFormStateStore);
        return state.data[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(projectUpdFormStateStore);
        set(projectUpdFormStateStore, {
          ...prev,
          data: {
            ...prev.data,
            [param]: newValue,
          },
        });
      },
  })(key);
