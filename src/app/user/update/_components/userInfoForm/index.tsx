'use client';

import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  userInfoFormLoadingSelector,
  userInfoFormStateStore,
} from '@/store/useProfileEditor/UserInfoFormStateStore';
import { UserDetailInfo } from '@/features/core/user/api/getUserDetailInfo';
import { useEffect } from 'react';
import Input from '@/shared/ui/Input';
import { UpdateNicknameControl } from '@/app/user/update/_components/userInfoForm/inputControl/UpdateNicknameControl';
import UpdatePositionControl from '@/app/user/update/_components/userInfoForm/inputControl/UpdatePositionControl';
import UpdateTechStackControl from '@/app/user/update/_components/userInfoForm/inputControl/UpdateTechStackControl';
import UpdateIntroductionControl from '@/app/user/update/_components/userInfoForm/inputControl/UpdateIntroductionControl';
import { bigIntToString } from '@/shared/utils/stringUtils';
import UserInfoFormSkeleton from '@/app/user/update/_components/userInfoForm/UserInfoFormSkeleton';

type UserInfoFormProps = {
  data: UserDetailInfo;
};

const UserInfoForm = ({ data }: UserInfoFormProps) => {
  const { position, nickname, techStacks, intro, email } = data;
  const positionId = bigIntToString(position.positionId);
  const techStackIds = techStacks.map((v) => bigIntToString(v.techStackId));

  const setUserInfoForm = useSetRecoilState(userInfoFormStateStore);
  const [isUserInfoFormLoading, setIsUserInfoFormLoading] = useRecoilState(
    userInfoFormLoadingSelector,
  );

  useEffect(() => {
    if (isUserInfoFormLoading) {
      setUserInfoForm({
        isFormLoading: false,
        data: {
          isCheckedNickname: false,
          positionId,
          nickname,
          techStackIds,
          intro,
        },
      });
      setIsUserInfoFormLoading(false);
    }
  }, [
    isUserInfoFormLoading,
    positionId,
    nickname,
    techStackIds,
    intro,
    setUserInfoForm,
    setIsUserInfoFormLoading,
  ]);

  if (isUserInfoFormLoading) return <UserInfoFormSkeleton />;

  return (
    <>
      <Input id='email' label='이메일' required disabled defaultValue={email} />
      <UpdateNicknameControl />
      <UpdatePositionControl />
      <UpdateTechStackControl />
      <UpdateIntroductionControl />
    </>
  );
};

export default UserInfoForm;
