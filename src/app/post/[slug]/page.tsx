import PostDetail from '@/features/postDetail/PostDetail';
import { checkIsAuthorized } from '@/lib/checkIsAuthorized';

const PostPage = ({
  params: { slug: postId },
}: {
  params: { slug: string };
}) => {
  return <PostDetail isAuthorized={checkIsAuthorized()} postId={postId} />;
};

export default PostPage;
