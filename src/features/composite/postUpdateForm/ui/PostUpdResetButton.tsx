import Button from '@/shared/ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useResetRecoilState } from 'recoil';
import { postUpdFormStateStore } from '@/features/composite/postUpdateForm/store/PostUpdFormStateStore';
import { POST_DATA_QUERY_KEY } from '@/features/core/post/api/getPost';

const PostUpdResetButton = () => {
  const resetPostUpdForm = useResetRecoilState(postUpdFormStateStore);

  const queryClient = useQueryClient();

  const handleClickResetButton = () => {
    resetPostUpdForm();
    queryClient.invalidateQueries({
      queryKey: [POST_DATA_QUERY_KEY],
    });
  };

  return (
    <Button theme='primaryHollow' size='md' onClick={handleClickResetButton}>
      초기화
    </Button>
  );
};

export default PostUpdResetButton;
