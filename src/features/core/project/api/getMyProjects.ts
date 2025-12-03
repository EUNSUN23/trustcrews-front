import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ITEM_COUNT_PER_PAGE } from '@/shared/constants/pagination';
import { PageResponseBody } from '@/shared/types/responseBody';
import sortByStartDate from '@/shared/utils/sortByStartDate';
import { Project } from '@/entities/project';

export const getMyProjects = async (
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<Project[]>> => {
  const resBody = await request(
    'GET',
    `/api/project/auth?pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );

  return {
    ...resBody,
    data: resBody.data
      ? {
          totalPages: resBody.data.totalPages,
          content: resBody.data.content
            ? sortByStartDate(resBody.data.content, 'desc')
            : [],
        }
      : null,
  };
};

export const MY_PROJECTS_QUERY_KEY = 'myProjects';

export const useMyProjects = (pageNumber: number) => {
  return useSuspenseQuery({
    queryKey: [MY_PROJECTS_QUERY_KEY, pageNumber],
    queryFn: () => getMyProjects(pageNumber, ITEM_COUNT_PER_PAGE.CARDS),
  });
};
