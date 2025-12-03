import CrewDetailInfoSkeleton from '@/features/composite/projectCrew/ui/crewProfile/CrewDetailInfoSkeleton';
import CrewDetailInfo from '@/features/composite/projectCrew/ui/crewProfile/CrewDetailInfo';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

type CrewProfileContainerProps = {
  crewId: bigint;
};

const CrewProfileContainer = ({ crewId }: CrewProfileContainerProps) => {
  return (
    <FieldQueryBoundary
      errorFallbackSize='md'
      suspenseFallback={<CrewDetailInfoSkeleton />}
    >
      <CrewDetailInfo crewId={crewId} />
    </FieldQueryBoundary>
  );
};

export default CrewProfileContainer;
