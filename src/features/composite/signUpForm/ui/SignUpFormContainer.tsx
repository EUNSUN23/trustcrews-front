'use client';

import { Suspense } from 'react';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import SignUpEmailControl from '@/features/composite/signUpForm/ui/inputControl/SignUpEmailControl';
import SignUpPasswordControl from '@/features/composite/signUpForm/ui/inputControl/SignUpPasswordControl';
import SignUpNicknameControl from '@/features/composite/signUpForm/ui/inputControl/SignUpNicknameControl';
import SignUpPositionControl from '@/features/composite/signUpForm/ui/inputControl/SignUpPositionControl';
import SignUpTechStackControl from '@/features/composite/signUpForm/ui/inputControl/SignUpTechStackControl';
import SignUpIntroControl from '@/features/composite/signUpForm/ui/inputControl/SignUpIntroControl';
import SignUpButton from '@/features/composite/signUpForm/ui/SignUpButton';

const SignUpForm = () => {
  return (
    <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
      <SignUpEmailControl />
      <SignUpPasswordControl />
      <SignUpNicknameControl />
      <Suspense
        fallback={
          <SelectSkeleton label='포지션' placeholder='포지션을 선택해주세요' />
        }
      >
        <SignUpPositionControl />
      </Suspense>
      <Suspense
        fallback={
          <SelectSkeleton
            label='사용 스택'
            placeholder='사용 스택을 선택해주세요.'
          />
        }
      >
        <SignUpTechStackControl />
      </Suspense>
      <SignUpIntroControl />
      <SignUpButton />
    </div>
  );
};

export default SignUpForm;
