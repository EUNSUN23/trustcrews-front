import UserInfoFormSkeleton from '@/app/user/update/_components/userInfoForm/UserInfoFormSkeleton';
import UserImageFormSkeleton from '@/app/user/update/_components/UserImageFormSkeleton';

const UserUpdatePageLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <UserImageFormSkeleton />
        <UserInfoFormSkeleton />
      </div>
    </div>
  );
};

export default UserUpdatePageLoading;
