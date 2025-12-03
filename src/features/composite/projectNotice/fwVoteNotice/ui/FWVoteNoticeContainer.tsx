import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import NoContentsMessage from '@/shared/ui/NoContentsMessage';
import { useFWVoteNoticeList } from '@/features/composite/projectNotice/fwVoteNotice/api/getFWVoteNoticeList';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/shared/constants/pagination';
import FWVoteNoticeItem from '@/features/composite/projectNotice/fwVoteNotice/ui/FWVoteNoticeItem';
import FWVoteNoticeModal from '@/features/composite/projectNotice/fwVoteNotice/ui/fwVoteNoticeModal';

type FWVoteNoticeContainerProps = {
  projectId: string;
  userPMAuthCode: string;
};

const FWVoteNoticeContainer = ({
  projectId,
  userPMAuthCode,
}: FWVoteNoticeContainerProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const {
    data: {
      data: { content: alertList, totalPages: totalItemsCount },
    },
  } = useFWVoteNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {alertList.map((item) => (
              <FWVoteNoticeItem
                key={item.noticeId}
                data={item}
                projectId={projectId}
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
      <FWVoteNoticeModal />
    </>
  );
};

export default FWVoteNoticeContainer;
