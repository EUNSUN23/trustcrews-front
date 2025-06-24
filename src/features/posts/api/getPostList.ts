import { isEqual } from 'lodash';
import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectInfoSummary } from '@/features/projectDetail/projectInfo/api/getProjectInfoSummary';
import { PageResponseBody } from '@/shared/types/responseBody';
import { TrustGrade } from '@/types/data/trustGrade';
import { Position } from '@/types/data/position';
import { TechStackMapping } from '@/features/techStack/api/getTechStackMappings';

export interface SearchPostParams {
  techStacks: TechStackMapping[];
  position: string;
  keyword: string;
  page: number;
}

export const createQueryParams = (params: SearchPostParams) => {
  const { techStacks, position, keyword, page } = params;
  const queryParams = new URLSearchParams();

  techStacks.forEach((stack) =>
    queryParams.append('technologyIds', stack.techStackId.toString()),
  );
  if (position !== '0') {
    queryParams.append('positionId', position);
  }
  if (!isEqual(keyword, '')) {
    queryParams.append('keyword', keyword);
  }
  queryParams.append('page', page.toString());

  return decodeURI(queryParams.toString());
};

export type PostInfoSummary = {
  project: ProjectInfoSummary;
  postId: bigint;
  title: string;
  recruitmentStatus: boolean;
  postPositions: { postPositionId: bigint | number; position: Position }[];
  user: {
    email: string;
    nickname: string;
    profileImgSrc: string | null;
    trustGrade: TrustGrade;
  };
  createDate: string;
  updateDate: string;
};

export const DEFAULT_SEARCH_POST_PARAM: SearchPostParams = {
  techStacks: [],
  position: '0',
  keyword: '',
  page: 0,
};

export const getPostList = async (
  params: SearchPostParams = DEFAULT_SEARCH_POST_PARAM,
): Promise<PageResponseBody<PostInfoSummary[]>> => {
  const queryParams = createQueryParams(params);
  return await request('GET', `/api/post/public/list?${queryParams}`);
};

export const POST_LIST_QUERY_KEY = 'postList';

export const usePostList = (params: SearchPostParams) => {
  return useSuspenseQuery({
    queryKey: [
      POST_LIST_QUERY_KEY,
      params.techStacks,
      params.position,
      params.keyword,
      params.page,
    ],
    queryFn: () => getPostList(params),
    staleTime: 0,
  });
};
