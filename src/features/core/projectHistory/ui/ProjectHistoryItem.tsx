import { AiFillRocket } from '@react-icons/all-files/ai/AiFillRocket';
import { BiUser } from '@react-icons/all-files/bi/BiUser';
import { BiCheck } from '@react-icons/all-files/bi/BiCheck';
import { BiUndo } from '@react-icons/all-files/bi/BiUndo';
import { BiX } from '@react-icons/all-files/bi/BiX';
import { ProjectHistoryData } from '@/features/core/projectHistory/types/projectHistoryData';
import { ProjectHistoryStatus } from '@/features/core/projectHistory/types/projectHistoryStatus';
import { PROJECT_HISTORY_STATUS } from '@/features/core/projectHistory/constants/projectHistoryStatus';
import { cva } from 'class-variance-authority';

const {
  PHIST_STAT_001: { code: LAUNCH },
  PHIST_STAT_002: { code: JOIN },
  PHIST_STAT_003: { code: FINISH },
  PHIST_STAT_004: { code: WITHDRAW },
  PHIST_STAT_005: { code: FWITHDRAW },
} = PROJECT_HISTORY_STATUS;

const HistoryStatusIconVariants = cva(
  'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
  {
    variants: {
      status: {
        [LAUNCH]: 'bg-orange-400',
        [JOIN]: 'bg-blue-500',
        [FINISH]: 'bg-green-500',
        [WITHDRAW]: 'bg-gray-400',
        [FWITHDRAW]: 'bg-red-400',
      },
    },
  },
);

const getIconByStatus = (status: ProjectHistoryStatus) => {
  const iconClassName = 'h-5 w-5 text-white';

  switch (status.code) {
    case LAUNCH:
      return <AiFillRocket className={iconClassName} aria-hidden={true} />;
    case JOIN:
      return <BiUser className={iconClassName} aria-hidden={true} />;
    case FINISH:
      return <BiCheck className={iconClassName} aria-hidden={true} />;
    case WITHDRAW:
      return <BiUndo className={iconClassName} aria-hidden={true} />;
    case FWITHDRAW:
      return <BiX className={iconClassName} aria-hidden={true} />;
    default:
      return null;
  }
};

type ProjectHistoryItemProps = {
  history: ProjectHistoryData;
  isLast: boolean;
};

const ProjectHistoryItem = ({ history, isLast }: ProjectHistoryItemProps) => {
  const {
    status: { code: statusCode, name: StatusDesc },
    projectName,
    updateDate,
  } = history;

  return (
    <>
      {!isLast && (
        <div
          className='absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200'
          aria-hidden='true'
        />
      )}
      <ul className='relative grid grid-cols-12 grid-rows-1'>
        <li className='mobile:col-span-2' aria-hidden={true}>
          <div
            className={HistoryStatusIconVariants({
              status: statusCode,
            })}
          >
            <span className='sr-only'>{StatusDesc}</span>
            {getIconByStatus(history.status)}
          </div>
        </li>
        <li className='pt-1 col-span-3 tablet:col-span-4 mobile:col-span-7 tablet:text-lg mobile:text-sm font-medium text-gray-900'>
          {projectName}
        </li>
        <li className='pt-1 col-span-7 tablet:col-span-6 mobile:sr-only text-gray-500'>
          {StatusDesc}
        </li>
        <li className='pt-1 mobile:col-span-3 whitespace-nowrap mobile:text-xs text-right text-gray-500 '>
          <time dateTime={updateDate}>{updateDate}</time>
        </li>
      </ul>
    </>
  );
};

export default ProjectHistoryItem;
