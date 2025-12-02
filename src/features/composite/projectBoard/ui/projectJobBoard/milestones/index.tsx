'use client';

import { MilestoneInfo } from '@/features/core/milestone/constants/milestone';
import { useRecoilValue } from 'recoil';
import { activeMilestoneStateStore } from '@/store/projectDetail/job/milestone/ActiveMilestoneStateStore';
import { useEffect, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import useMobileMediaQuery from '@/hooks/mediaQuery/useMobileMediaQuery';
import MilestoneCard from '@/features/composite/projectBoard/ui/projectJobBoard/milestones/milestoneCard';

type MilestonesProps = {
  data: MilestoneInfo[];
  totalCounts: number;
};

const Milestones = ({ data, totalCounts }: MilestonesProps) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [slidePerView, setSlidePerView] = useState(() =>
    totalCounts <= 4 ? totalCounts - 1 : 3,
  );

  const { index: activeMilestoneIndex } = useRecoilValue(
    activeMilestoneStateStore,
  );

  useEffect(() => {
    swiperRef.current?.slideToLoop(activeMilestoneIndex);
  }, [activeMilestoneIndex]);

  const isMobile = useMobileMediaQuery();

  useEffect(() => {
    if (isMobile) setSlidePerView(1);
  }, [isMobile]);

  if (totalCounts === 0)
    return (
      <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
        <span className='tablet:text-3xl text-grey800 font-semibold'>
          마일스톤을 추가해 주세요
        </span>
      </div>
    );

  return (
    <div className='pc:w-[1200px] tablet:w-[680px] mobile:w-full flex bg-white overflow-hidden z-0'>
      <Swiper
        className='swiper'
        slidesPerView={slidePerView}
        slidesPerGroup={1}
        loopAddBlankSlides={true}
        loop={true}
        modules={[Navigation, Pagination, Grid]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {data.map((milestoneInfo) => (
          <SwiperSlide key={`milestone-${milestoneInfo.milestoneId}`}>
            <MilestoneCard milestoneInfo={milestoneInfo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Milestones;
