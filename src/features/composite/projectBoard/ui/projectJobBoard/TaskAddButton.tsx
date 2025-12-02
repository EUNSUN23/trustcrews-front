'use client';

import Button from '@/shared/ui/Button';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { taskAddModalStateStore } from '@/store/projectDetail/job/task/TaskModalStateStore';
import { activeMilestoneStateStore } from '@/store/projectDetail/job/milestone/ActiveMilestoneStateStore';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';

const TaskAddButton = () => {
  const projectId = useRecoilValue(projectIdState);
  const { milestoneId } = useRecoilValue(activeMilestoneStateStore);
  const setTaskModalState = useSetRecoilState(taskAddModalStateStore);

  const handleClickAddButton = () => {
    setTaskModalState((prev) => ({
      ...prev,
      isOpen: true,
      projectId,
      milestoneId,
    }));
  };

  return (
    <Button size='md' onClick={handleClickAddButton}>
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        업무 추가
      </span>
    </Button>
  );
};

export default TaskAddButton;
