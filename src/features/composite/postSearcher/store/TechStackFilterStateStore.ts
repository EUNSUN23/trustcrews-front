import { atom } from 'recoil';
import { TechStackMapping } from '@/features/core/techStack/api/getTechStackMappings';
import { SelectItem } from '@/shared/types/selectItem';

export const DEFAULT_TECH_CATEGORY: SelectItem<string, string> = {
  name: 'All',
  value: '0',
};

export const techStackCategoryState = atom<SelectItem<string, string>>({
  key: 'techStackCategoryState',
  default: DEFAULT_TECH_CATEGORY,
});

export const selectedTechStackState = atom<TechStackMapping[]>({
  key: 'selectedTechStackState',
  default: [],
});
