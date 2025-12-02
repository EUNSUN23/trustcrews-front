import { useRecoilState, useRecoilValue } from 'recoil';
import {
  taskFormFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/features/composite/projectBoard/store/job/task/TaskModalStateStore';
import { Field, Label } from '@headlessui/react';
import { projectIdState } from '@/features/composite/projectBoard/store/ProjectIdStateStore';
import ProjectCrewSelector from '@/features/core/crews/ui/ProjectCrewSelector';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';

type TaskAssignedCrewProps = {
  modalType: TaskModalType;
};

const TaskAssignedCrewControl = ({ modalType }: TaskAssignedCrewProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const [assignedUserId, setAssignedUserId] = useRecoilState(
    taskFormFieldSelector({
      modalType,
      fieldKey: 'assignedUserId',
    }),
  );

  const projectId = useRecoilValue(projectIdState);

  return (
    <Field className='flex mobile:space-x-6'>
      <Label className='text-gray-700 font-semibold self-center'>담당</Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='크루 선택' className='max-w-[150px]' />
        }
      >
        <ProjectCrewSelector
          projectId={projectId}
          selected={assignedUserId}
          setSelected={(selected) => setAssignedUserId(selected)}
          disabled={disabled}
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default TaskAssignedCrewControl;
