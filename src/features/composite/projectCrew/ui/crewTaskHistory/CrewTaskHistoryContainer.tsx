import CrewTaskHistoryListSkeleton from '@/features/composite/projectCrew/ui/crewTaskHistory/CrewTaskHistoryListSkeleton';
import CrewTaskHistoryList from '@/features/composite/projectCrew/ui/crewTaskHistory/CrewTaskHistoryList';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

type CrewTaskHistoryContainerProps = {
  crewId: bigint;
};

const CrewTaskHistoryContainer = ({
  crewId,
}: CrewTaskHistoryContainerProps) => {
  return (
    <FieldQueryBoundary
      errorFallbackSize='md'
      suspenseFallback={<CrewTaskHistoryListSkeleton />}
    >
      <CrewTaskHistoryList crewId={crewId} />
    </FieldQueryBoundary>
  );
};

export default CrewTaskHistoryContainer;
