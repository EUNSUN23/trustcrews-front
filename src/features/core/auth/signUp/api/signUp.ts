import { useMutation } from '@tanstack/react-query';
import { request } from '@/lib/clientApi/request';
import { z } from 'zod';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';
import { NICKNAME_REGEX, PASSWORD_REGEX } from '@/constants/validationRegex';

export const signUpInputScheme = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email('이메일 형식이 아닙니다.'),
  password: z
    .object({
      init: z
        .string()
        .min(1, { message: '비밀번호를 입력해주세요.' })
        .regex(PASSWORD_REGEX, {
          message: '비밀번호는 6~12자로 영문, 숫자, 특수문자를 포함해야합니다.',
        }),
      confirm: z.string().min(1, { message: '비밀번호를 재입력해주세요.' }),
    })
    .refine((data) => data.init === data.confirm, {
      message: '비밀번호와 재입력된 비밀번호가 일치하지 않습니다.',
      path: ['password'],
    }),
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .regex(NICKNAME_REGEX, {
      message: '닉네임은 6~10자로, 영문과 숫자를 포함해야합니다.',
    }),
  isCheckedNickname: z.boolean().refine((val) => val, {
    message: '닉네임 중복확인을 해주세요.',
  }),
  positionId: z
    .bigint()
    .or(z.number())
    .nullable()
    .refine((val) => val, { message: '포지션을 선택해주세요.' }),
  techStackIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '관심스택을 선택해주세요.' }),
  intro: z.string().nullable().optional(),
});

export type SignUpInput = z.infer<typeof signUpInputScheme>;

export const signUp = async (
  param: SignUpInput,
): Promise<ResponseBody<null>> => {
  const {
    email,
    password: { init, confirm },
    nickname,
    positionId,
    techStackIds,
    intro,
  } = param;

  return await request('POST', '/api/signUp', {
    email,
    password: init,
    passwordConfirmation: confirm,
    nickname,
    positionId,
    techStackIds,
    intro,
  });
};

type SignUpRes = ApiResult<typeof signUp>;

export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: SignUpRes) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
