import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { UpdateProjectInfoInput } from '@/features/project/api/updateProjectInfo';

interface UpdateProjectConfigFormData
  extends Omit<UpdateProjectInfoInput, 'technologyIds'> {
  technologyIds: string[];
}

type UpdateProjectConfigFormState = {
  isFormLoading: boolean;
  data: UpdateProjectConfigFormData;
};

const DEFAULT_PROJECT_CONFIG_FORM: UpdateProjectConfigFormData = {
  projectName: '',
  projectSubject: '',
  startDate: '',
  endDate: '',
  technologyIds: [],
};

export const projectConfigFormStateStore = atom<UpdateProjectConfigFormState>({
  key: 'projectConfigFormStateStore',
  default: {
    isFormLoading: true,
    data: DEFAULT_PROJECT_CONFIG_FORM,
  },
});

export const projectConfigFormLoadingSelector = selector<boolean>({
  key: 'projectConfigFormLoadingSelector',
  get: ({ get }) => {
    const state = get(projectConfigFormStateStore);
    return state.isFormLoading;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const prev = get(projectConfigFormStateStore);
    set(projectConfigFormStateStore, { ...prev, isFormLoading: newValue });
  },
});

export const projectConfigFormFieldSelector = <
  K extends keyof UpdateProjectConfigFormData,
>(
  key: K,
): ReturnType<typeof projectConfigFormFieldSelectorFamily<K>> => {
  return projectConfigFormFieldSelectorFamily<K>(key);
};

const projectConfigFormFieldSelectorFamily = <
  K extends keyof UpdateProjectConfigFormData,
>(
  key: K,
) =>
  selectorFamily<UpdateProjectConfigFormData[K], K>({
    key: 'projectConfigFormFieldSelector',
    get:
      (param) =>
      ({ get }) => {
        const state = get(projectConfigFormStateStore);
        return state.data[param];
      },
    set:
      (param) =>
      ({ get, set }, newValue) => {
        if (newValue instanceof DefaultValue) return;
        const prev = get(projectConfigFormStateStore);
        set(projectConfigFormStateStore, {
          ...prev,
          data: {
            ...prev.data,
            [param]: newValue,
          },
        });
      },
  })(key);
