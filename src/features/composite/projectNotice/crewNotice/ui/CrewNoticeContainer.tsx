import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import NoContentsMessage from '@/shared/ui/NoContentsMessage';
import { useCrewNoticeList } from '@/features/composite/projectNotice/crewNotice/api/getCrewNoticeList';
import NoticeBadge from '@/features/core/projectNotice/ui/NoticeBadge';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/shared/constants/pagination';
import { PROJECT_NOTICE_TYPES } from '@/entities/projectNoticeType';

type CrewNoticeContainerProps = {
  projectId: string;
};

const CrewNoticeContainer = ({ projectId }: CrewNoticeContainerProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const {
    data: {
      data: { content: noticeList, totalPages: totalItemsCount },
    },
  } = useCrewNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {noticeList.map(({ noticeId, contents, createDate }) => (
              <li
                key={`crewNotice-${noticeId}`}
                className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900'
              >
                <div className='flex items-center gap-x-4'>
                  <NoticeBadge noticeType={PROJECT_NOTICE_TYPES.PRA2001.code}>
                    {PROJECT_NOTICE_TYPES.PRA2001.name}
                  </NoticeBadge>
                  {contents}
                </div>
                <div className='ml-auto text-grey600'>{createDate}</div>
              </li>
            ))}
          </ul>
        ) : (
          <NoContentsMessage />
        )}
      </div>
      <CommonPagination
        activePage={pageIndex + 1}
        itemsCountPerPage={ITEM_COUNT_PER_PAGE.LIST_SM}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        onChange={(pageIndex: number) => setPageIndex(pageIndex - 1)}
      />
    </>
  );
};

export default CrewNoticeContainer;
