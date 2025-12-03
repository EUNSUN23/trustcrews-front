import Button from '@/shared/ui/Button';
import { useSetRecoilState } from 'recoil';
import {
  CrewFWModalState,
  crewFWModalStateStore,
  DEFAULT_FW_MODAL_STATE,
} from '@/features/composite/projectCrew/store/CrewFWModalStateStore';
import { bigIntToString } from '@/shared/utils/stringUtils';

const { title: DEFALUT_TITLE } = DEFAULT_FW_MODAL_STATE;

type CrewFwButtonProps = {
  fwRequestInfo: {
    userPMAuthCode: string;
    crewPMAuthCode: string;
    crewId: bigint;
    projectId: bigint;
  };
};

const CrewFwButton = ({ fwRequestInfo }: CrewFwButtonProps) => {
  const setCrewFWModalState = useSetRecoilState(crewFWModalStateStore);

  const { userPMAuthCode, crewPMAuthCode, crewId, projectId } = fwRequestInfo;

  const handleClickCrewFWButton = () => {
    const updateModalState: CrewFWModalState = {
      title: DEFALUT_TITLE,
      isOpen: true,
      projectId: bigIntToString(projectId),
      crewId: bigIntToString(crewId),
      crewPMAuth: crewPMAuthCode,
      userPMAuth: userPMAuthCode,
    };
    setCrewFWModalState(updateModalState);
  };

  return (
    <Button
      type='button'
      theme='danger'
      size='md'
      onClick={handleClickCrewFWButton}
    >
      강제탈퇴 투표
    </Button>
  );
};

export default CrewFwButton;
