import { atom } from 'recoil';
import { SelectItem } from '@/shared/types/selectItem';
import { DEFAULT_POSITION_OPTION } from '@/features/core/position/constants/defaultPositionOption';

export const projectApplyPositionState = atom<SelectItem<string, string>>({
  key: 'selectRecruitPositionState',
  default: DEFAULT_POSITION_OPTION,
});
