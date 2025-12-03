import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import _ from 'lodash';
import { v4 } from 'uuid';
import { CreateTaskInput } from '@/features/core/task/api/createTask';
import { UpdateTaskInput } from '@/features/core/task/api/updateTask';
import { ModalState } from '@/shared/types/modalState';
import { TASK_STATUS } from '@/entities/task/taskStatus';

const {
  PS002: { code: TASK_PROCESSING },
  PS003: { code: TASK_COMPLETE },
} = TASK_STATUS;

export type TaskModalType = 'add' | 'mod';

interface TaskAddModalState extends ModalState {
  projectId: string;
  milestoneId: string;
}

export const taskAddModalStateStore = atom<TaskAddModalState>({
  key: 'taskAddModalStateStore',
  default: {
    isOpen: false,
    title: '업무 추가',
    projectId: '0',
    milestoneId: '0',
  },
});

export const isTaskAddFormFieldKey = (
  modalType: TaskModalType,
  _: string,
): _ is TaskAddFormFieldKey => {
  return modalType === 'add';
};

export type TaskAddFormFieldKey = keyof TaskAddForm;

export type TaskAddForm = Omit<CreateTaskInput, 'assignedUserId'> & {
  assignedUserId: string;
};

export const taskAddFormStateStore = atom<TaskAddForm>({
  key: 'taskAddFormStateStore',
  default: {
    summary: '',
    startDate: '',
    endDate: '',
    assignedUserId: '0',
    todo: '',
  },
});

export interface TaskModModalState extends ModalState {
  projectId: string;
  taskId: string;
  userPMAuth: string;
}

export const taskModModalStateStore = atom<TaskModModalState>({
  key: 'taskModModalStateStore',
  default: {
    isOpen: false,
    title: '업무 수정',
    projectId: '0',
    taskId: '0',
    userPMAuth: '',
  },
});

export const isTaskModFormFieldKey = (
  modalType: TaskModalType,
  _: string,
): _ is TaskModFormFieldKey => {
  return modalType === 'mod';
};

export type TaskModFormFieldKey = keyof TaskModForm;

export type TaskModForm = Omit<UpdateTaskInput, 'assignedUserId'> & {
  assignedUserId: string;
};

export const taskModFormStateStore = atom<TaskModForm>({
  key: 'taskModFormStateStore',
  default: {
    summary: '',
    startDate: '',
    endDate: '',
    assignedUserId: '0',
    todo: '',
    progressStatus: TASK_PROCESSING,
  },
});

export const taskFormFieldSelector = selectorFamily({
  key: 'taskFormFieldSelector',
  get:
    (param: { modalType: TaskModalType; fieldKey: TaskAddFormFieldKey }) =>
    ({ get }) => {
      const state = isTaskAddFormFieldKey(param.modalType, param.fieldKey)
        ? get(taskAddFormStateStore)
        : get(taskModFormStateStore);
      return state[param.fieldKey];
    },
  set:
    (param: { modalType: TaskModalType; fieldKey: TaskAddFormFieldKey }) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      if (isTaskAddFormFieldKey(param.modalType, param.fieldKey)) {
        const state = get(taskAddFormStateStore);
        set(taskAddFormStateStore, {
          ...state,
          [param.fieldKey]: newValue,
        });
      } else if (isTaskModFormFieldKey(param.modalType, param.fieldKey)) {
        const state = get(taskModFormStateStore);
        set(taskModFormStateStore, {
          ...state,
          [param.fieldKey]: newValue,
        });
      }
    },
});

export const taskTodoSelector = selectorFamily({
  key: 'taskTodoSelector',
  get:
    (param: TaskModalType) =>
    ({ get }) => {
      const state =
        param === 'add'
          ? get(taskAddFormStateStore)
          : get(taskModFormStateStore);

      const newTaskTodo = new Map();

      if (!state.todo) return newTaskTodo;

      state.todo.split('&').forEach((item) => {
        newTaskTodo.set(v4(), item);
      });

      return newTaskTodo;
    },
  set:
    (param: TaskModalType) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const newTaskTodoList = [];
      if (!_.isEmpty(newValue)) {
        for (const [_, value] of newValue) {
          newTaskTodoList.push(value);
        }
      }
      const newTaskTodoString = newTaskTodoList.join('&');

      const state =
        param === 'add'
          ? get(taskAddFormStateStore)
          : get(taskModFormStateStore);

      const newState = {
        ...state,
        todo: newTaskTodoString,
      };

      if (param === 'add') {
        set(taskAddFormStateStore, newState);
      } else if (param === 'mod') {
        set(taskModFormStateStore, newState as TaskModForm);
      }
    },
});

export const taskTodoItemSelector = selectorFamily({
  key: 'taskTodoItemSelector',
  get:
    (param: { modalType: TaskModalType; idForEdit: string }) =>
    ({ get }) => {
      const state = get(taskTodoSelector(param.modalType));
      return _.isEmpty(state) ? '' : state.get(param.idForEdit)!;
    },
  set:
    (param: { modalType: TaskModalType; idForEdit: string }) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) return;

      const state = get(taskTodoSelector(param.modalType));

      const newTaskTodoItem = new Map([[param.idForEdit, newValue]]);

      const newTaskTodos = new Map([...state, ...newTaskTodoItem]);

      set(taskTodoSelector(param.modalType), newTaskTodos);
    },
});

export const taskProgressModFieldSelector = selector({
  key: 'taskProgressModFieldSelector',
  get: ({ get }) => {
    const state = get(taskModFormStateStore);
    return state.progressStatus;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const state = get(taskModFormStateStore);
    set(taskModFormStateStore, { ...state, progressStatus: newValue });
  },
});

export const taskModalEditDisabledSelector = selectorFamily({
  key: 'taskModalEditDisabledSelector',
  get:
    (param: TaskModalType) =>
    ({ get }) => {
      if (param === 'add') return false;

      const state = get(taskModFormStateStore);
      const progressStatusCode = state.progressStatus;
      return progressStatusCode === TASK_COMPLETE;
    },
});
