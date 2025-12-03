export type TechStackCategory = {
  techStackCategoryId: bigint;
  techStackCategoryName: string;
};

export interface TechStackData {
  techStackId: bigint | number;
  techStackName: string;
}

export interface TechStackMappingData extends TechStackData {
  categories: string[];
}
