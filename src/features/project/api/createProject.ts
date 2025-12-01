import { z } from 'zod';
import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const createProjectInputSchema = z.object({
  name: z.string().nonempty({ message: '프로젝트 이름을 입력해 주세요.' }),
  subject: z.string().nonempty({ message: '프로젝트 주제를 입력해 주세요.' }),
  startDate: z
    .string()
    .nonempty({ message: '프로젝트 시작 날짜를 입력해 주세요.' }),
  endDate: z
    .string()
    .nonempty({ message: '프로젝트 종료 날짜를 입력해 주세요.' }),
  technologyIds: z
    .array(z.bigint())
    .readonly()
    .or(z.array(z.number()).readonly())
    .refine((val) => val.length > 0, {
      message: '프로젝트 기술스택을 선택해 주세요.',
    }),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

type CreateProjectResponseData = { projectId: bigint };

export const createProject = async (
  data: CreateProjectInput,
): Promise<ResponseBody<CreateProjectResponseData>> => {
  return await request('POST', 'api/project/auth/create', data);
};

export type CreateProjectRes = ApiResult<typeof createProject>;

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (data: CreateProjectInput) => createProject(data),
  });
};
