'use client';

import MilestoneAddButton from '@/features/composite/projectJob/ui/MilestoneAddButton';
import { useMilestones } from '@/features/core/milestone/api/getMilestones';
import { useRecoilState, useResetRecoilState } from 'recoil';
import TaskAddButton from '@/features/composite/projectJob/ui/TaskAddButton';
import { useEffect } from 'react';
import {
  activeMilestoneStateStore,
  DEFAULT_ACTIVE_MILESTONE,
} from '@/features/composite/projectJob/store/ActiveMilestoneStateStore';
import ProjectJobContainerSkeleton from '@/features/composite/projectJob/ui/ProjectJobContainerSkeleton';
import MilestoneModModal from '@/features/composite/projectJob/ui/milestoneModal/MilestoneModModal';
import MilestoneAddModal from '@/features/composite/projectJob/ui/milestoneModal/MilestoneAddModal';
import TaskAddModal from '@/features/composite/projectJob/ui/taskModal/TaskAddModal';
import TaskModModal from '@/features/composite/projectJob/ui/taskModal/TaskModModal';
import TasksSkeleton from '@/features/composite/projectJob/ui/tasks/TasksSkeleton';
import { bigIntToString } from '@/shared/utils/stringUtils';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import Milestones from '@/features/composite/projectJob/ui/milestones';
import Tasks from '@/features/composite/projectJob/ui/tasks';

const { milestoneId: DEFAULT_MILESTONE_ID } = DEFAULT_ACTIVE_MILESTONE;

type ProjectJobContainerProps = {
  projectId: string;
  userPMAuthCode: string;
};

const ProjectJobContainer = ({
  projectId,
  userPMAuthCode,
}: ProjectJobContainerProps) => {
  const [{ milestoneId: activeMilestoneId }, setActiveMilestone] =
    useRecoilState(activeMilestoneStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);
  const {
    data: { data },
  } = useMilestones(projectId);

  const initActiveMilestone = data[0];

  useEffect(() => {
    if (initActiveMilestone) {
      setActiveMilestone({
        milestoneId: bigIntToString(initActiveMilestone.milestoneId),
        index: initActiveMilestone.index,
        startDate: initActiveMilestone.startDate,
        endDate: initActiveMilestone.endDate,
      });
    }

    return () => {
      resetActiveMilestone();
    };
  }, [initActiveMilestone, setActiveMilestone, resetActiveMilestone]);

  if (initActiveMilestone && activeMilestoneId === DEFAULT_MILESTONE_ID)
    return <ProjectJobContainerSkeleton />;

  return (
    <section className='w-full tablet:px-2 flex flex-col justify-between space-y-[6rem]'>
      <section className='w-full flex flex-col items-start'>
        <MilestoneAddButton />
        <Milestones
          data={data}
          totalCounts={data.length}
          userPMAuthCode={userPMAuthCode}
        />
        <section className='w-full mt-12 flex flex-col items-start'>
          <div className='w-full flex mobile:flex-col mobile:items-start items-center justify-start mobile:space-y-4 tablet:mb-4'>
            <TaskAddButton projectId={projectId} />
            {initActiveMilestone && (
              <div className='flex-wrap flex mobile:flex-col items-center mobile:items-start tablet:ml-4 mr-auto space-x-3 mobile:space-x-0'>
                <h3 className='max-w-[300px] my-1 tablet:text-3xl mobile:text-lg font-medium text-greyDarkBlue truncate'>
                  {initActiveMilestone.content}
                </h3>
                <div className='flex-wrap flex items-center space-x-2 tablet:text-xl mobile:text-base text-grey800'>
                  <span>{initActiveMilestone.startDate}</span>
                  <span>&#126;</span>
                  <span>{initActiveMilestone.endDate}</span>
                </div>
              </div>
            )}
          </div>
          <FieldQueryBoundary
            errorFallbackSize='md'
            suspenseFallback={<TasksSkeleton />}
          >
            <Tasks projectId={projectId} userPMAuthCode={userPMAuthCode} />
          </FieldQueryBoundary>
        </section>
      </section>
      <MilestoneModModal userPMAuthCode={userPMAuthCode} />
      <MilestoneAddModal
        projectId={projectId}
        userPMAuthCode={userPMAuthCode}
      />
      <TaskAddModal />
      <TaskModModal />
    </section>
  );
};

export default ProjectJobContainer;
