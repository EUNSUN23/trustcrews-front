import PostUpdPositionsControl from '@/features/composite/postUpdateForm/ui/inputControl/PostUpdPositionsControl';
import PostUpdContactControl from '@/features/composite/postUpdateForm/ui/inputControl/PostUpdContactControl';
import PostUpdContentControl from '@/features/composite/postUpdateForm/ui/inputControl/PostUpdContentControl';
import PostUpdSaveButton from '@/features/composite/postUpdateForm/ui/PostUpdSaveButton';
import PostUpdRecruitStatusControl from '@/features/composite/postUpdateForm/ui/inputControl/PostUpdRecruitStatusControl';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import PostUpdResetButton from '@/features/composite/postUpdateForm/ui/PostUpdResetButton';
import FormContainerLayout from '@/shared/ui/formLayout/FormContainerLayout';
import FormTitleLayout from '@/shared/ui/formLayout/FormTitleLayout';
import FormContentsLayout from '@/shared/ui/formLayout/FormContentsLayout';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import PostUpdTitleControl from '@/features/composite/postUpdateForm/ui/inputControl/PostUpdTitleControl';
import { usePostConfig } from '@/features/core/post/api/getPost';
import { useEffect } from 'react';
import {
  postUpdFormLoadingSelector,
  postUpdFormStateStore,
} from '@/features/composite/postUpdateForm/store/PostUpdFormStateStore';
import PostUpdFormContainerSkeleton from '@/features/composite/postUpdateForm/ui/PostUpdFormContainerSkeleton';

type PostUpdFormContainerProps = {
  projectId: string;
  userPMAuthCode: string;
};

const PostUpdFormContainer = ({
  projectId,
  userPMAuthCode,
}: PostUpdFormContainerProps) => {
  const isFormLoading = useRecoilValue(postUpdFormLoadingSelector);
  const setPostUpdForm = useSetRecoilState(postUpdFormStateStore);

  const {
    data: { data },
  } = usePostConfig(numStrToBigInt(projectId));

  const { title, postPositions, contact, recruitmentStatus, content } = data;
  const positionIds = postPositions.map((v) =>
    bigIntToString(v.position.positionId),
  );

  useEffect(() => {
    if (isFormLoading) {
      setPostUpdForm({
        isFormLoading: false,
        data: {
          title,
          positionIds,
          contact,
          recruitmentStatus,
          content,
        },
      });
    }
  }, [
    isFormLoading,
    title,
    positionIds,
    contact,
    recruitmentStatus,
    content,
    setPostUpdForm,
  ]);

  if (isFormLoading) return <PostUpdFormContainerSkeleton />;

  return (
    <FormContainerLayout>
      <FormTitleLayout>모집 게시글 정보</FormTitleLayout>
      <FormContentsLayout>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostUpdRecruitStatusControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostUpdTitleControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostUpdPositionsControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostUpdContactControl />
        </div>
        <div className='w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto pc:col-span-2'>
          <PostUpdContentControl />
        </div>
      </FormContentsLayout>
      <div className='pc:w-full my-4 flex items-center justify-center space-x-2'>
        <PostUpdResetButton />
        <PostUpdSaveButton
          userPMAuthCode={userPMAuthCode}
          projectId={projectId}
        />
      </div>
    </FormContainerLayout>
  );
};

export default PostUpdFormContainer;
