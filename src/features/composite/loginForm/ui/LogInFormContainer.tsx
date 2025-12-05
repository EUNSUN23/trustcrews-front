'use client';

import { useState } from 'react';
import Input from '@/shared/ui/Input';
import FormButton from '@/shared/ui/FormButton';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { ZodError } from 'zod';
import {
  loginInputSchema,
  useLogin,
} from '@/features/core/auth/login/api/logIn';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { MY_PROJECTS_QUERY_KEY } from '@/features/core/project/api/getMyProjects';
import { MY_PROJECT_APPLIES_QUERY_KEY } from '@/features/core/projectApplication/api/getMyProjectApplies';
import { SIMPLE_USER_INFO_QUERY_KEY } from '@/features/core/user/api/getSimpleUserInfo';
import { useSetRecoilState } from 'recoil';
import { authStateStore } from '@/shared/store/AuthStateStore';
import { bigIntToString } from '@/shared/utils/stringUtils';

const LogInFormContainer = () => {
  const { setErrorSnackbar, setInfoSnackbar } = useSnackbar();
  const router = useRouter();
  const setAuthState = useSetRecoilState(authStateStore);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();
  const { mutate: login } = useLogin({
    onSuccess: async (res) => {
      const { message } = res;

      const invalidateUserInfo = queryClient.invalidateQueries({
        queryKey: [SIMPLE_USER_INFO_QUERY_KEY],
      });
      const invalidateMyProjectList = queryClient.invalidateQueries({
        queryKey: [MY_PROJECTS_QUERY_KEY],
      });
      const invalidateProjectNotice = queryClient.invalidateQueries({
        queryKey: [MY_PROJECT_APPLIES_QUERY_KEY],
      });
      await Promise.all([
        invalidateMyProjectList,
        invalidateProjectNotice,
        invalidateUserInfo,
      ]);

      setAuthState({ isAuthorized: true, userId: bigIntToString(res.data) });
      setInfoSnackbar(message);
      router.replace('/');
      router.refresh();
    },
    onError: (error) => {
      setErrorSnackbar(error.message);
    },
  });

  const loginWithValidation = () => {
    const param = { email, password };
    try {
      loginInputSchema.parse(param);
    } catch (e) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    login(param);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') loginWithValidation();
  };

  const handleClickLoginButton = () => {
    loginWithValidation();
  };

  return (
    <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-4'>
      <Input
        id='email'
        label='이메일'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyUp={handleKeyDown}
      />
      <Input
        type='password'
        id='password'
        label='비밀번호'
        title='영문, 숫자 포함 6자 이상 입력'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={handleKeyDown}
      />
      <br />
      <FormButton aria-label='로그인 버튼' onClick={handleClickLoginButton}>
        로그인
      </FormButton>
    </div>
  );
};

export default LogInFormContainer;
