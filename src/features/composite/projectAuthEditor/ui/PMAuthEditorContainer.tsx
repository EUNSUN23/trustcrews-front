import PMAuthEditorItem from '@/features/composite/projectAuthEditor/ui/PMAuthEditorItem';
import { useProjectCrewList } from '@/features/core/crews/api/getProjectCrewList';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

type PMAuthEditorContainerProps = {
  projectId: string;
  userPMAuthCode: string;
};

const PMAuthEditorContainer = ({
  projectId,
  userPMAuthCode,
}: PMAuthEditorContainerProps) => {
  const {
    data: {
      data: { projectCrews: crewList },
    },
  } = useProjectCrewList(numStrToBigInt(projectId));

  return (
    <div className='mx-auto mt-8 flow-root'>
      <div className='-ml-4 -my-2 sm:-ml-6 lg:-ml-12'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <table className='min-w-full divide-y divide-gray-300'>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {crewList.map((crew) => (
                <PMAuthEditorItem
                  key={crew.crewId}
                  projectId={projectId}
                  userPMAuthCode={userPMAuthCode}
                  crew={crew}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PMAuthEditorContainer;
