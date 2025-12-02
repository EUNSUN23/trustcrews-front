import Button from '@/shared/ui/Button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { projectFormStateStore } from '@/features/composite/projectLauncher/store/ProjectFormStateStore';
import { postFormStateStore } from '@/features/composite/projectLauncher/store/PostFormStateStore';
import { ZodError } from 'zod';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useLaunchProject } from '@/features/composite/projectLauncher/api/launchProject';
import { useRouter } from 'next/navigation';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { createPostInputSchema } from '@/features/core/post/api/createPost';
import { createProjectInputSchema } from '@/features/core/project/api/createProject';

const LaunchButton = () => {
  const router = useRouter();
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const resetPostFormState = useResetRecoilState(postFormStateStore);
  const resetProjectFormState = useResetRecoilState(projectFormStateStore);

  const postForm = useRecoilValue(postFormStateStore);
  const projectForm = useRecoilValue(projectFormStateStore);

  const { mutate: createPostWithProject, isPending: isCreating } =
    useLaunchProject({
      onSuccess: async (res) => {
        setSuccessSnackbar(res.message);
        resetPostFormState();
        resetProjectFormState();
        router.replace('/');
      },
      onError: (error) => setErrorSnackbar(error.message),
    });

  const handleClickSaveButton = async () => {
    const postData = {
      ...postForm,
      positionIds: postForm.positionIds.map((v) => numStrToBigInt(v)),
    };
    const projectData = {
      ...projectForm,
      technologyIds: projectForm.technologyIds.map((item) =>
        numStrToBigInt(item),
      ),
    };

    try {
      createPostInputSchema.parse(postData);
      createProjectInputSchema.parse(projectData);
    } catch (e) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    createPostWithProject({ postData, projectData });
  };

  return (
    <Button disabled={isCreating} onClick={handleClickSaveButton}>
      등록
    </Button>
  );
};

export default LaunchButton;
