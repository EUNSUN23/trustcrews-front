'use client';

import Avatar from '@/shared/ui/avatar';
import Badge from '@/shared/ui/Badge';
import TechStackImage from '@/features/core/techStack/ui/TechStackImage';
import TrustGradeBadge from '@/features/core/trustGrade/ui/TrustGradeBadge';
import { useCrewDetail } from '@/features/core/crews/api/getCrewDetail';
import PMAuthBadge from '@/features/core/projectAuth/ui/PMAuthBadge';
import { TechStackData } from '@/entities/techStack';

type CrewDetailInfoProps = {
  crewId: bigint;
};

const CrewDetailInfo = ({ crewId }: CrewDetailInfoProps) => {
  const {
    data: { data: crewInfo },
  } = useCrewDetail(crewId);

  const {
    user: {
      trustGrade: { name: trustGradeName },
      trustScore,
      nickname,
      profileImgSrc,
      technologyStacks: crewTechnologyStacks,
    },
    position,
    crewPMAuth,
    isCurrentUser,
  } = crewInfo;

  return (
    <div className='flex mobile:flex-col mobile:space-y-6 mobile:mt-4 px-1 py-4 mx-auto items-center justify-center'>
      <section className='mobile:w-full pc:w-[200px] tablet:w-[150px] tablet:mr-10 flex flex-col items-center'>
        <Avatar
          size='md'
          src={profileImgSrc}
          alt='크루 아바타 이미지'
          loading='eager'
        />
        <ul className='my-3 flex flex-col items-center'>
          <li className='flex items-center pc:text-2xl tablet:text-[1.3rem] mobile:text-[1.3rem] font-medium text-greyDarkBlue'>
            <span className='leading-relaxed'>{nickname}</span>
            <TrustGradeBadge
              trustGrade={trustGradeName}
              size='lg'
              className='px-2 tablet:px-2 mobile:px-2 py-1 tablet:py-1 mobile:py-2 self-stretch'
            />
          </li>
        </ul>
      </section>
      <section className='mobile:w-full tablet:h-[220px] mobile:h-[180px] flex flex-col flex-wrap justify-between p-6 mobile:p-4 bg-ground100 rounded-lg'>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            프로젝트 권한
          </span>
          <div className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <PMAuthBadge auth={crewPMAuth.code} size='md'>
              {crewPMAuth.name}
            </PMAuthBadge>
          </div>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            프로젝트 포지션
          </span>
          <div className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <Badge text={position.positionName} size='md' />
          </div>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            기술스택
          </span>
          <div className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <ul className='flex items-center space-x-1'>
              {crewTechnologyStacks.map((stack: TechStackData) => (
                <li key={stack.techStackId}>
                  <TechStackImage
                    stackName={stack.techStackName}
                    width={32}
                    height={32}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            신뢰점수
          </span>
          <div className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <span className='pc:text-[22px] tablet:text-base mobile:text-sm font-semibold'>
              {trustScore} 점
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrewDetailInfo;
