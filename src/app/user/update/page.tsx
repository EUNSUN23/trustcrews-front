import SaveUserProfileButton from '@/app/user/update/_components/SaveUserProfileButton';
import { getUserDetailInfo } from '@/features/user/api/getUserDetailInfo';
import UserImageForm from '@/app/user/update/_components/UserImageForm';
import UserInfoForm from '@/app/user/update/_components/userInfoForm';

const UserUpdatePage = async () => {
  const { data: userDetailInfo } = await getUserDetailInfo();
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <UserImageForm profileImgSrc={userDetailInfo.profileImgSrc} />
        <UserInfoForm data={userDetailInfo} />
        <SaveUserProfileButton />
      </div>
    </div>
  );
};

export default UserUpdatePage;
