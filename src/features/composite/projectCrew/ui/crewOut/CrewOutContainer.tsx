import CrewOutButton from '@/features/composite/projectCrew/ui/crewOut/CrewOutButton';
import CrewFwButton from '@/features/composite/projectCrew/ui/crewOut/CrewFWButton';
import { useCrewDetail } from '@/features/core/crews/api/getCrewDetail';

type CrewOutContainerProps = {
  crewId: bigint;
  userPMAuthCode: string;
};

export const CrewOutContainer = ({
  crewId,
  userPMAuthCode,
}: CrewOutContainerProps) => {
  const {
    data: { data: crewInfo },
  } = useCrewDetail(crewId);

  const {
    crewPMAuth: { code: crewPMAuthCode },
    isCurrentUser,
    projectId,
  } = crewInfo;

  const fwRequestInfo = {
    userPMAuthCode,
    crewPMAuthCode,
    projectId,
    crewId,
  };

  return isCurrentUser ? (
    <CrewOutButton crewInfo={crewInfo} />
  ) : (
    <CrewFwButton fwRequestInfo={fwRequestInfo} />
  );
};
