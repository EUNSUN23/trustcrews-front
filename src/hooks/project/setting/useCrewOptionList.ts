import { useQuery } from '@tanstack/react-query';
import { getCrewAuthOptions } from '@/service/setting/setting';
import { PageResponseBody, ProjectAuthMap } from '@/utils/type';

/**
 * 프로젝트 크루 권한 옵션 조회
 */
export default function useCrewOptionList() {
  const { data, isFetching } = useQuery<
    PageResponseBody<ProjectAuthMap[]>,
    Error,
    PageResponseBody<ProjectAuthMap[]>
  >({
    queryKey: ['crewOptions'],
    queryFn: getCrewAuthOptions,
  });

  const crewOptions = data?.data.content || [];

  return { crewOptions, isFetching };
}
