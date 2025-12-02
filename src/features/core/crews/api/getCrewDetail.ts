import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/shared/types/responseBody';
import { Position } from '@/features/core/position/types/position';
import { TrustGrade } from '@/features/core/trustGrade/types/trustGrade';
import { TechStack } from '@/features/core/techStack/types/techStack';
import { ProjectAuthMap } from '@/features/core/projectMngAuth/types/projectAuth';
import { CrewStatusKey } from '@/features/core/crews/types/crewStatusKey';

interface ProjectCrewUserDetail {
  userId: bigint;
  email: string;
  nickname: string;
  profileImgSrc: string;
  position: Position;
  trustGrade: TrustGrade;
  trustScore: number;
  role: string;
  createDate: string;
  updateDate: string;
  technologyStacks: TechStack[];
}

export type ProjectCrewProfileInfo = {
  crewId: bigint;
  projectId: bigint;
  projectCount: number;
  user: ProjectCrewUserDetail;
  crewPMAuth: ProjectAuthMap;
  position: Position;
  status: CrewStatusKey;
  isCurrentUser: boolean;
};

export const getCrewDetail = async (
  crewId: bigint,
): Promise<ResponseBody<ProjectCrewProfileInfo>> => {
  return await request('GET', `/api/projectCrew/auth/${crewId}`);
};

export const CREW_DETAIL_QUERY_KEY = 'crewDetail';

export const useCrewDetail = (crewId: bigint) => {
  return useSuspenseQuery({
    queryKey: [CREW_DETAIL_QUERY_KEY, bigIntToString(crewId)],
    queryFn: () => getCrewDetail(crewId),
  });
};
