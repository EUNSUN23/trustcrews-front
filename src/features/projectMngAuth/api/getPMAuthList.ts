import { request } from '@/lib/clientApi/request';
import { ProjectAuthMap } from '@/types/data/projectDetail/projectAuth';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PageResponseBody } from '@/shared/types/responseBody';

export const getPMAuthList = async (): Promise<
  PageResponseBody<ProjectAuthMap[]>
> => {
  return await request('GET', '/api/pmAuth');
};

export const PM_AUTH_LIST_QUERY_KEY = 'crewOptions';

export const usePMAuthList = () => {
  return useSuspenseQuery({
    queryKey: [PM_AUTH_LIST_QUERY_KEY],
    queryFn: getPMAuthList,
  });
};
