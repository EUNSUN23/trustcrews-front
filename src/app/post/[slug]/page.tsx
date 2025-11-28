import PostPage from '@/app/post/[slug]/_components/PostPage';
import { checkIsAuthorized } from '@/lib/checkIsAuthorized';

const PostPage = ({
  params: { slug: postId },
}: {
  params: { slug: string };
}) => {
  return <PostPage isAuthorized={checkIsAuthorized()} postId={postId} />;
};

export default PostPage;
