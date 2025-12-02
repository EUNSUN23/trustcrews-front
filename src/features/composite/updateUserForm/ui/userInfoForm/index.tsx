'use client';

import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  userInfoFormLoadingSelector,
  userInfoFormStateStore,
} from '@/features/composite/updateUserForm/store/UserInfoFormStateStore';
import { useEffect } from 'react';
import Input from '@/shared/ui/Input';
import { UpdateNicknameControl } from '@/features/composite/updateUserForm/ui/userInfoForm/inputControl/UpdateNicknameControl';
import UpdatePositionControl from '@/features/composite/updateUserForm/ui/userInfoForm/inputControl/UpdatePositionControl';
import UpdateTechStackControl from '@/features/composite/updateUserForm/ui/userInfoForm/inputControl/UpdateTechStackControl';
import UpdateIntroductionControl from '@/features/composite/updateUserForm/ui/userInfoForm/inputControl/UpdateIntroductionControl';
import { bigIntToString } from '@/shared/utils/stringUtils';
import UserInfoFormSkeleton from '@/features/composite/updateUserForm/ui/userInfoForm/UserInfoFormSkeleton';
import { useUserDetailInfo } from '@/features/core/user/api/getUserDetailInfo';

const UserInfoForm = () => {
  const setUserInfoForm = useSetRecoilState(userInfoFormStateStore);

  const [isUserInfoFormLoading, setIsUserInfoFormLoading] = useRecoilState(
    userInfoFormLoadingSelector,
  );

  const {
    data: { data: profileInfo },
  } = useUserDetailInfo();

  const { position, nickname, techStacks, intro, email } = profileInfo;
  const positionId = bigIntToString(position.positionId);
  const techStackIds = techStacks.map((v) => bigIntToString(v.techStackId));

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
