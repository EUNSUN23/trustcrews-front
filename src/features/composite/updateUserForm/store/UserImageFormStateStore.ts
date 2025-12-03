import { atom } from 'recoil';
import { UserProfileImgInput } from '@/features/core/user/api/updateUserDetail';

type UserImageFormStateStore = {
  image: UserProfileImgInput;
  hasUpdate: boolean;
};

export const userImageFormStateStore = atom<UserImageFormStateStore>({
  key: 'userImageFormStateStore',
  default: {
    image: null,
    hasUpdate: false,
  },
});
