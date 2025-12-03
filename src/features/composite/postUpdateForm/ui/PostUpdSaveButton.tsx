import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ZodError } from 'zod';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { postUpdFormStateStore } from '@/features/composite/postUpdateForm/store/PostUpdFormStateStore';
import {
  updatePostInputSchema,
  useUpdatePost,
} from '@/features/core/post/api/updatePost';
import { POST_DATA_QUERY_KEY } from '@/features/core/post/api/getPost';
import { POST_DETAIL_QUERY_KEY } from '@/features/core/post/api/getPostDetail';
import { useQueryClient } from '@tanstack/react-query';

type PostUpdSaveButtonProps = {
  projectId: string;
  userPMAuthCode: string;
};

const PostUpdSaveButton = ({
  projectId,
  userPMAuthCode,
}: PostUpdSaveButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const {
    data: { title, positionIds, contact, content, recruitmentStatus },
  } = useRecoilValue(postUpdFormStateStore);

  const queryClient = useQueryClient();
  const { mutate: updatePostInfo, isPending } = useUpdatePost(
    numStrToBigInt(projectId),
    userPMAuthCode,
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({
          queryKey: [POST_DATA_QUERY_KEY, POST_DETAIL_QUERY_KEY],
        });
        setSuccessSnackbar(res.message);
      },
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleSavePostInfButton = () => {
    const data = {
      projectId: numStrToBigInt(projectId),
      title,
      positionIds: positionIds.map((v) => numStrToBigInt(v)),
      contact,
      content,
      recruitmentStatus,
    };

    try {
      updatePostInputSchema.parse(data);
    } catch (e: unknown) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    updatePostInfo(data);
  };

  return (
    <Button
      size='md'
      onClick={handleSavePostInfButton}
      disabled={isPending}
      className='disabled:!bg-gray-400 disabled:!text-white'
    >
      저장
    </Button>
  );
};

export default PostUpdSaveButton;
