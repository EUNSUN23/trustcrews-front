import PostConfigPositionsControl from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/inputControl/PostConfigPositionsControl';
import PostConfigContactControl from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/inputControl/PostConfigContactControl';
import PostConfigContentControl from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/inputControl/PostConfigContentControl';
import ProjectPostInfoSaveButton from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/PostConfigSaveButton';
import PostConfigRecruitStatusControl from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/inputControl/PostConfigRecruitStatusControl';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import PostConfigResetButton from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/PostConfigResetButton';
import ConfigLayout from '@/features/composite/projectBoard/ui/projectConfigBoard/ConfigLayout';
import ConfigSummaryLayout from '@/features/composite/projectBoard/ui/projectConfigBoard/ConfigSummaryLayout';
import ConfigContentsLayout from '@/features/composite/projectBoard/ui/projectConfigBoard/ConfigContentsLayout';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import PostConfigTitleControl from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/inputControl/PostConfigTitleControl';
import { usePostConfig } from '@/features/core/post/api/generalConfig/getPostConfig';
import { useEffect } from 'react';
import {
  postConfigFormLoadingSelector,
  postConfigFormStateStore,
} from '@/store/projectDetail/config/post/PostConfigFormStateStore';
import PostConfigFormSkeleton from '@/features/composite/projectBoard/ui/projectConfigBoard/postInfoEditor/PostConfigFormSkeleton';

const PostConfigForm = () => {
  const isFormLoading = useRecoilValue(postConfigFormLoadingSelector);
  const setPostConfigForm = useSetRecoilState(postConfigFormStateStore);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data },
  } = usePostConfig(numStrToBigInt(projectId));

  const { title, postPositions, contact, recruitmentStatus, content } = data;
  const positionIds = postPositions.map((v) =>
    bigIntToString(v.position.positionId),
  );

  useEffect(() => {
    if (isFormLoading) {
      setPostConfigForm({
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
    setPostConfigForm,
  ]);

  if (isFormLoading) return <PostConfigFormSkeleton />;

  return (
    <ConfigLayout>
      <ConfigSummaryLayout>모집 게시글 정보</ConfigSummaryLayout>
      <ConfigContentsLayout>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigRecruitStatusControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigTitleControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigPositionsControl />
        </div>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <PostConfigContactControl />
        </div>
        <div className='w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto pc:col-span-2'>
          <PostConfigContentControl />
        </div>
      </ConfigContentsLayout>
      <div className='pc:w-full my-4 flex items-center justify-center space-x-2'>
        <PostConfigResetButton />
        <ProjectPostInfoSaveButton />
      </div>
    </ConfigLayout>
  );
};

export default PostConfigForm;
