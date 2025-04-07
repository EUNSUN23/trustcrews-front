'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import useCreatePost from '@/hooks/post/useCreatePost';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {
  postFormStateStore,
  projectFormStateStore,
  projectPostFormState,
} from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import PostTitle from '@/components/postRegister/PostTitle';
import ProjectName_Reg from '@/components/postRegister/ProjectName_Reg';
import ProjectSubject_Reg from '@/components/postRegister/ProjectSubject_Reg';
import ProjectRecruitPosition from '@/components/postRegister/ProjectRecruitPosition';
import ProjectDate_Reg from '@/components/postRegister/ProjectDate_Reg';
import ProjectTech from '@/components/postRegister/ProjectTech';
import ProjectOwnerContact from '@/components/postRegister/ProjectOwnerContact';
import ProjectIntro from '@/components/postRegister/ProjectIntro';
import Button from '@/components/ui/Button';
import FormRowWide from '@/components/ui/form/FormRowWide';

function RegisterPage() {
  const router = useRouter();

  const { createPost, isCreating } = useCreatePost();

  const projectPostForm = useRecoilValue(projectPostFormState);

  const resetPostFormState = useResetRecoilState(postFormStateStore);
  const resetProjectFormState = useResetRecoilState(projectFormStateStore);

  useEffect(() => {
    return () => {
      resetPostFormState();
      resetProjectFormState();
    };
  }, [resetPostFormState, resetProjectFormState]);

  return (
    <div
      role='form'
      aria-label='게시글 및 프로젝트 생성'
      className='p-5 mobile:p-1 mb-8'
    >
      <PostTitle />
      <div className='grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center'>
        <ProjectName_Reg />
        <ProjectSubject_Reg />
        <ProjectRecruitPosition />
        <ProjectDate_Reg />
        <ProjectTech />
        <ProjectOwnerContact />
      </div>
      <ProjectIntro />
      <FormRowWide className='space-x-2 text-center mt-10'>
        <Button theme='primary-hollow' onClickHandler={() => router.push('/')}>
          취소
        </Button>
        <Button
          disabled={isCreating}
          onClickHandler={() => createPost(projectPostForm)}
        >
          등록
        </Button>
      </FormRowWide>
    </div>
  );
}

export default RegisterPage;
