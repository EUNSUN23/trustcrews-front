import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import NoContentsMessage from '@/shared/ui/NoContentsMessage';
import { useRCVoteNoticeList } from '@/features/composite/projectNotice/rcVoteNotice/api/getRCVoteNoticeList';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/shared/constants/pagination';
import RCVoteNoticeItem from '@/features/composite/projectNotice/rcVoteNotice/ui/RCVoteNoticeItem';

type RCVoteNoticeContainerProps = {
  projectId: string;
  userPMAuthCode: string;
};

const RCVoteNoticeContainer = ({
  projectId,
  userPMAuthCode,
}: RCVoteNoticeContainerProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const {
    data: {
      data: { content: alertList, totalPages: totalItemsCount },
    },
  } = useRCVoteNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {alertList.map((item) => (
              <RCVoteNoticeItem
                key={item.noticeId}
                data={item}
                userPMAuthCode={userPMAuthCode}
              />
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

export default RCVoteNoticeContainer;
