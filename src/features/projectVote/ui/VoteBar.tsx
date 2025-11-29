'use client';

import { ChangeEvent, useState } from 'react';
import { clsx } from 'clsx';
import { cva } from 'class-variance-authority';
import { VOTE_OPTIONS } from '@/constants/data/projectDetail/vote/voteOptions';
import { VoteOptionCode } from '@/types/data/projectDetail/projectVote/projectVote';

const {
  VODA1001: { code: AGREE },
  VODA1002: { code: DISAGREE },
} = VOTE_OPTIONS;

const VoteBarVariants = cva(
  'h-full text-center text-xs text-white rounded-full',
  {
    variants: {
      voteOption: {
        [AGREE]: 'bg-green-500 aria-disabled:bg-green-500/30',
        [DISAGREE]: 'bg-red-500 aria-disabled:bg-red-500/30',
      },
    },
  },
);

type VoteBarProps = {
  group: string;
  label: string;
  counts: number;
  maxCounts: number;
  disabled: boolean;
  onChangeVoteHandler: (value: string) => void;
  voteOption: VoteOptionCode;
};

const VoteBar = ({
  group,
  label,
  counts,
  maxCounts,
  onChangeVoteHandler,
  disabled,
  voteOption,
}: VoteBarProps) => {
  const [checked, setChecked] = useState(false);

  const barWidth = counts > 0 ? Math.floor((counts / maxCounts) * 100) : 0;

  const handleChangeCheckVote = (e: ChangeEvent<HTMLInputElement>) => {
    if (confirm('투표하시겠습니까?')) {
      onChangeVoteHandler(e.target.value);
    } else {
      setChecked(false);
      e.target.blur();
    }
  };

  return (
    <div className='flex mobile:flex-col justify-center items-center mobile:items-start'>
      <div className='text-nowrap tablet:basis-[50px] text-[18px] mobile:text-base text-greyDarkblue font-medium'>
        {label}
      </div>
      <div className='flex w-full justify-around items-center space-x-12 mobile:space-x-9'>
        <div
          className={clsx(
            `relative tablet:basis-[70%] mobile:w-full h-2 rounded-full`,
            disabled ? 'bg-gray-400/40' : 'bg-gray-400/80',
          )}
        >
          <div
            aria-disabled={disabled}
            style={{ width: `${barWidth}%` }}
            className={VoteBarVariants({})}
          ></div>
          <span className='absolute top-[-7px] left-[102%] mobile:text-sm text-greyBlue font-medium'>{`${counts}/${maxCounts}`}</span>
        </div>
        <div className='flex space-x-2 h-5 items-center'>
          <input
            type='radio'
            name={group}
            onChange={handleChangeCheckVote}
            value={voteOption}
            checked={checked}
            className='self-stretch border-gray-400 text-indigo-600 focus:ring-none'
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default VoteBar;
