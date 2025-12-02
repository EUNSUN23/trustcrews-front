'use client';

import Button from '@/shared/ui/Button';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useSetRecoilState } from 'recoil';
import { milestoneAddModalStateStore } from '@/store/projectDetail/job/milestone/MilestoneModalStateStore';

const MilestoneAddButton = () => {
  const setMilestoneAddModalState = useSetRecoilState(
    milestoneAddModalStateStore,
  );

  const handleClickAddButton = () => {
    setMilestoneAddModalState((prev) => ({ ...prev, isOpen: true }));
  };

  return (
    <Button
      size='md'
      className='mb-4'
      onClick={handleClickAddButton}
      aria-label='마일스톤 추가'
    >
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        마일스톤 추가
      </span>
    </Button>
  );
};

export default MilestoneAddButton;
