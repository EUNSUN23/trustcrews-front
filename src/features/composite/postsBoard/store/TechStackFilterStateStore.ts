import { atom } from 'recoil';
import { SelectItem } from '@/shared/types/selectItem';
import { TechStackMappingData } from '@/shared/model/techStack/techStackMappingData';

export const DEFAULT_TECH_CATEGORY: SelectItem<string, string> = {
  name: 'All',
  value: '0',
};

export const techStackCategoryState = atom<SelectItem<string, string>>({
  key: 'techStackCategoryState',
  default: DEFAULT_TECH_CATEGORY,
});

export const selectedTechStackState = atom<TechStackMappingData[]>({
  key: 'selectedTechStackState',
  default: [],
});
