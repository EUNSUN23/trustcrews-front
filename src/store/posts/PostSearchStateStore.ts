import { atom } from 'recoil';
import { SelectItem } from '@/shared/types/selectItem';
import { DEFAULT_POSITION_OPTION } from '@/features/core/position/constants/defaultPositionOption';

export const selectedPositionState = atom<SelectItem<string, string>>({
  key: 'selectedPositionState',
  default: DEFAULT_POSITION_OPTION,
});

export const postSearchValue = atom<string>({
  key: 'postSearchValue',
  default: '',
});
