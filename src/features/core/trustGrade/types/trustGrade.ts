export type TrustGradeName = 'level1' | 'level2' | 'level3' | 'level4';

export type TrustGrade = {
  name: TrustGradeName;
  minimumScore: number;
  maximumScore: number;
};
