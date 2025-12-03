import FormButton from '@/shared/ui/FormButton';
import useSnackbar from '@/shared/hooks/useSnackbar';
import {
  userInfoInputSchema,
  userProfileImgInputSchema,
  useUpdateUserDetail,
} from '@/features/core/user/api/updateUserDetail';
import { ZodError } from 'zod';
import { useRecoilValue } from 'recoil';
import { userInfoFormStateStore } from '@/features/composite/updateUserForm/store/UserInfoFormStateStore';
import { userImageFormStateStore } from '@/features/composite/updateUserForm/store/UserImageFormStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { POST_LIST_QUERY_KEY } from '@/features/core/post/api/getPostList';
import { useQueryClient } from '@tanstack/react-query';
import { SIMPLE_USER_INFO_QUERY_KEY } from '@/features/core/user/api/getSimpleUserInfo';

const UpdateUserButton = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { data: infoForm } = useRecoilValue(userInfoFormStateStore);
  const { image, hasUpdate: hasProfileImgUpdate } = useRecoilValue(
    userImageFormStateStore,
  );

  const queryClient = useQueryClient();
  const { mutate: updateUser } = useUpdateUserDetail({
    onSuccess: async (res) => {
      const invalidateSimpleUser = queryClient.invalidateQueries({
        queryKey: [SIMPLE_USER_INFO_QUERY_KEY],
      });
      const invalidatePostList = queryClient.invalidateQueries({
        queryKey: [POST_LIST_QUERY_KEY],
      });
      await Promise.all([invalidateSimpleUser, invalidatePostList]);
      setSuccessSnackbar(res.message);
    },
    onError: (error) => setErrorSnackbar(error.message),
  });

  const handleClickSaveProfileButton = () => {
    const info = {
      ...infoForm,
      positionId: numStrToBigInt(infoForm.positionId),
      techStackIds: infoForm.techStackIds.map((item) => numStrToBigInt(item)),
    };

    try {
      userInfoInputSchema.parse(info);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }

    if (hasProfileImgUpdate) {
      try {
        userProfileImgInputSchema.parse(image);
      } catch (e: unknown) {
        if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
        return;
      }
    }

    updateUser(hasProfileImgUpdate ? { info, image } : { info });
  };

  return <FormButton onClick={handleClickSaveProfileButton}>저장</FormButton>;
};

export default UpdateUserButton;
