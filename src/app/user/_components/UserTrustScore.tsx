import TrustGradeBadge from '@/features/core/trustGrade/ui/TrustGradeBadge';
import { TrustGradeName } from '@/features/core/trustGrade/types/trustGrade';

type UserTrustScoreProps = {
  trustGrade: TrustGradeName;
  trustScore: number;
};

const UserTrustScore = ({ trustGrade, trustScore }: UserTrustScoreProps) => {
  return (
    <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
      <h3 className='tablet:text-[26px] mobile:text-lg font-semibold text-greyDarkBlue mt-10 mb-8 mobile:my-5'>
        신뢰 점수
      </h3>
      <div className='flex text-center justify-start pt-2 mobile:pt-1 divide-gray-300 divide-x-2'>
        <div className='flex flex-col tablet:text-[20px] mobile:text-sm pr-5 mobile:pr-3 tablet:space-y-2.5'>
          <p>신뢰 등급</p>
          <TrustGradeBadge
            badgeStyle='text'
            trustGrade={trustGrade}
            size='md'
          />
        </div>
        <div className='flex flex-col tablet:text-[20px] mobile:text-sm px-5 mobile:px-3 tablet:space-y-3.5 mobile:space-y-1.5'>
          <p>신뢰 점수</p>
          <p>{trustScore}</p>
        </div>
      </div>
    </div>
  );
};

export default UserTrustScore;
