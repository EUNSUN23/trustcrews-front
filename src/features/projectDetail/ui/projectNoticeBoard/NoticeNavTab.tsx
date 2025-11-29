'use client';

import { useRecoilState } from 'recoil';
import Select from '@/shared/ui/Select';
import { activeNoticeTabStateStore } from '@/store/projectDetail/notice/ActiveNoticeTabStateStore';
import { NOTICE_TABS } from '@/constants/data/projectDetail/notice/noticeTabs';
import { clsx } from 'clsx';
import {NoticeTab} from "@/types/data/projectDetail/notice/noticeTab";

const noticeNavTabClass = (isActive: boolean) =>
  clsx(
    'group flex items-center rounded-md p-5 pl-3 text-xl text-center leading-6 font-medium cursor-pointer',
    isActive
      ? 'bg-gray-50 text-primary'
      : 'text-gray-700 hover:text-primary hover:bg-gray-50',
  );

const NoticeNavTab = () => {
  const [{ code: activeCode, name: activeName }, setActiveNoticeMenu] =
    useRecoilState(activeNoticeTabStateStore);

  return (
    <nav
      className='flex flex-1 flex-col tablet:max-w-[10rem] mobile:mb-8'
      aria-label='Sidebar'
    >
      <ul role='list' className='mobile:hidden tablet:-mx-2 tablet:space-y-1'>
        {Object.values(NOTICE_TABS).map((v) => (
          <li key={v.code}>
            <div
              className={noticeNavTabClass(v.code === activeCode)}
              onClick={() => setActiveNoticeMenu(v)}
            >
              {v.name}
            </div>
          </li>
        ))}
      </ul>
      <div className='mobile:block hidden'>
        <Select
          items={Object.values(NOTICE_TABS).map((v) => ({
            name: v.name,
            value: v.code,
          }))}
          label=''
          setValue={(item) =>
            setActiveNoticeMenu({
              code: item.value,
              name: item.name,
            } as NoticeTab)
          }
          value={{ name: activeName, value: activeCode }}
        />
      </div>
    </nav>
  );
};

export default NoticeNavTab;
