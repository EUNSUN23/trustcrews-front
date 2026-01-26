'use client';

import ProjectInformation from './ProjectInformation';
import ProjectApplyFormContainer from '@/features/composite/projectApplyForm/ui/ProjectApplyFormContainer';
import { usePostDetail } from '@/features/core/post/api/getPostDetail';
import { useProjectSummaryInfo } from '@/features/core/project/api/getProjectInfoSummary';
import PostInformation from './PostInformation';
import PostIntroduction from './PostIntroduction';
import PostTitle from './PostTitle';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

type PostDetailProps = {
  isAuthorized: boolean;
  postId: string;
};

const PostDetailContainer = ({ isAuthorized, postId }: PostDetailProps) => {
  const { data: postRes } = usePostDetail(numStrToBigInt(postId));

  const postInfo = postRes.data;

  const { data: projectRes } = useProjectSummaryInfo(postInfo.projectId);

  const projectInfo = projectRes.data;

  return (
    <article className='p-5 mobile:p-1'>
      <PostTitle postInfo={postInfo} />
      <article className='pc:w-[90%] w-full min-h-[350px] mobile:min-h-[300px] flex flex-col justify-center space-y-8 mobile:space-y-0'>
        <PostInformation postInfo={postInfo} />
        <ProjectInformation projectInfo={projectInfo} />
      </article>
      <PostIntroduction content={postInfo.content} />
      <ProjectApplyFormContainer
        isAuthorized={isAuthorized}
        projectId={postInfo.projectId}
        positions={postInfo.postPositions.map(({ position }) => position)}
      />
    </article>
  );
};

export default PostDetailContainer;
