'use client';

import SaveUserProfileButton from '@/app/user/update/_components/SaveUserProfileButton';
import UserImageFormSkeleton from '@/app/user/update/_components/UserImageFormSkeleton';
import UserInfoFormSkeleton from '@/app/user/update/_components/userInfoForm/UserInfoFormSkeleton';
import dynamic from 'next/dynamic';

const UserProfileImgForm = dynamic(
  () => import('@/app/user/update/_components/UserImageForm'),
  {
    ssr: false,
    loading: () => <UserImageFormSkeleton />,
  },
);

const UserInfoForm = dynamic(
  () => import('@/app/user/update/_components/userInfoForm'),
  { ssr: false, loading: () => <UserInfoFormSkeleton /> },
);

const UserUpdatePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <UserProfileImgForm />
        <UserInfoForm />
        <SaveUserProfileButton />
      </div>
    </div>
  );
};

export default UserUpdatePage;
