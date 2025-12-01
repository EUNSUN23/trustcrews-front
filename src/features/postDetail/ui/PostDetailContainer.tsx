'use client';

import ProjectInformation from '@/features/postDetail/ui/ProjectInformation';
import ApplySection from '@/features/postDetail/ui/ApplySection';
import { usePostDetail } from '@/features/post/api/getPostDetail';
import { useProjectSummaryInfo } from '@/features/project/api/getProjectInfoSummary';
import PostInformation from '@/features/postDetail/ui/PostInformation';
import PostIntroduction from '@/features/postDetail/ui/PostIntroduction';
import PostTitle from '@/features/postDetail/ui/PostTitle';
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
      <ApplySection isAuthorized={isAuthorized} postInfo={postInfo} />
    </article>
  );
};

export default PostDetailContainer;
