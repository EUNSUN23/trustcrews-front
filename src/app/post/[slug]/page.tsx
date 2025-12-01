import PostDetailContainer from '@/app/post/[slug]/_components/PostDetailContainer';
import { checkIsAuthorized } from '@/lib/checkIsAuthorized';

const PostPage = ({
  params: { slug: postId },
}: {
  params: { slug: string };
}) => {
  return (
    <PostDetailContainer isAuthorized={checkIsAuthorized()} postId={postId} />
  );
};

export default PostPage;
