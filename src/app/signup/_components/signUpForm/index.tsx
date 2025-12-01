'use client';

import { Suspense } from 'react';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import SignUpEmailControl from '@/app/signup/_components/signUpForm/inputControl/SignUpEmailControl';
import SignUpPasswordControl from '@/app/signup/_components/signUpForm/inputControl/SignUpPasswordControl';
import SignUpNicknameControl from '@/app/signup/_components/signUpForm/inputControl/SignUpNicknameControl';
import SignUpPositionControl from '@/app/signup/_components/signUpForm/inputControl/SignUpPositionControl';
import SignUpTechStackControl from '@/app/signup/_components/signUpForm/inputControl/SignUpTechStackControl';
import SignUpIntroControl from '@/app/signup/_components/signUpForm/inputControl/SignUpIntroControl';
import SignUpButton from '@/app/signup/_components/signUpForm/SignUpButton';

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
