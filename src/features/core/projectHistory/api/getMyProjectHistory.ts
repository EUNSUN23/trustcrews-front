import 'server-only';
import { PageResponseBody } from '@/shared/types/responseBody';
import { ProjectHistoryData } from '@/features/core/projectHistory/types/projectHistory';
import { requestInServer } from '@/lib/serverApi/requestInServer';

export const getMyProjectHistory = async (
  pageNumber: number,
): Promise<PageResponseBody<ProjectHistoryData[]>> => {
  return await requestInServer(
    'GET',
    `/api/projectHistory/auth/me?pageNumber=${pageNumber}`,
  );
};
