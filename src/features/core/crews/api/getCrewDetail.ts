import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/shared/types/responseBody';
import { Position } from '@/shared/model/position';
import { TrustGrade } from '@/shared/model/trustGrade';
import { TechStackData } from '@/shared/model/techStack/techStackData';
import { ProjectAuthMap } from '@/shared/model/projectMngAuth/projectAuth';

interface ProjectCrewUserDetail {
  userId: bigint;
  email: string;
  nickname: string;
  profileImgSrc: string;
  position: Position;
  trustGrade: TrustGrade;
  trustScore: number;
  createDate: string;
  updateDate: string;
  technologyStacks: TechStackData[];
}

export type ProjectCrewProfileInfo = {
  crewId: bigint;
  projectId: bigint;
  projectCount: number;
  user: ProjectCrewUserDetail;
  crewPMAuth: ProjectAuthMap;
  position: Position;
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
