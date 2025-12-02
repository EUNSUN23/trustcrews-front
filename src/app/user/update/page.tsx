'use client';

import UpdateUserButton from '@/features/composite/updateUserForm/ui/UpdateUserButton';
import UserInfoFormSkeleton from '@/features/composite/updateUserForm/ui/userInfoForm/UserInfoFormSkeleton';
import dynamic from 'next/dynamic';
import UserImageFormSkeleton from '@/features/composite/updateUserForm/ui/userImageForm/UserImageFormSkeleton';

const UserImageForm = dynamic(
  () => import('@/features/composite/updateUserForm/ui/userImageForm'),
  {
    ssr: false,
    loading: () => <UserImageFormSkeleton />,
  },
);

const UserInfoForm = dynamic(
  () => import('../../../features/composite/updateUserForm/ui/userInfoForm'),
  { ssr: false, loading: () => <UserInfoFormSkeleton /> },
);

const UserUpdatePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <UserImageForm />
        <UserInfoForm />
        <UpdateUserButton />
      </div>
    </div>
  );
};

export default UserUpdatePage;
