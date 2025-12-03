import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import ResetProjectUpdButton from '@/features/composite/projectUpdateForm/ui/ResetProjectUpdButton';
import ProjectUpdTechStackControl from '@/features/composite/projectUpdateForm/ui/inputControl/ProjectUpdTechStackControl';
import SaveProjectUpdButton from '@/features/composite/projectUpdateForm/ui/SaveProjectUpdButton';
import FormContainerLayout from '@/shared/ui/formLayout/FormContainerLayout';
import FormTitleLayout from '@/shared/ui/formLayout/FormTitleLayout';
import FormContentsLayout from '@/shared/ui/formLayout/FormContentsLayout';
import ProjectUpdNameControl from '@/features/composite/projectUpdateForm/ui/inputControl/ProjectUpdNameControl';
import ProjectUpdSubjectControl from '@/features/composite/projectUpdateForm/ui/inputControl/ProjectUpdSubjectControl';
import ProjectUpdDateControl from '@/features/composite/projectUpdateForm/ui/inputControl/ProjectUpdDateControl';
import { useEffect } from 'react';
import {
  projectUpdFormLoadingSelector,
  projectUpdFormStateStore,
} from '@/features/composite/projectUpdateForm/store/ProjectUpdFormStateStore';
import ProjectUpdFormContainerSkeleton from '@/features/composite/projectUpdateForm/ui/ProjectUpdFormContainerSkeleton';
import { useProjectSummaryInfo } from '@/features/core/project/api/getProjectInfoSummary';

type ProjectUpdFormContainerProps = {
  projectId: string;
  userPMAuthCode: string;
};

const ProjectUpdFormContainer = ({
  projectId,
  userPMAuthCode,
}: ProjectUpdFormContainerProps) => {
  const isFormLoading = useRecoilValue(projectUpdFormLoadingSelector);
  const setProjectUpdForm = useSetRecoilState(projectUpdFormStateStore);

  const {
    data: { data: projectInfo },
  } = useProjectSummaryInfo(numStrToBigInt(projectId));

  const { projectName, projectSubject, startDate, endDate, technologyStacks } =
    projectInfo;

  const technologyIds = technologyStacks.map((v) =>
    bigIntToString(v.techStackId),
  );

  useEffect(() => {
    if (isFormLoading) {
      setProjectUpdForm({
        isFormLoading: false,
        data: {
          projectName,
          projectSubject,
          startDate,
          endDate,
          technologyIds,
        },
      });
    }
  }, [
    isFormLoading,
    projectName,
    projectSubject,
    startDate,
    endDate,
    technologyIds,
    setProjectUpdForm,
  ]);

  if (isFormLoading) return <ProjectUpdFormContainerSkeleton />;

  return (
    <FormContainerLayout>
      <FormTitleLayout>프로젝트 정보</FormTitleLayout>
      <FormContentsLayout>
        <ProjectUpdNameControl />
        <ProjectUpdSubjectControl />
        <ProjectUpdDateControl />
        <ProjectUpdTechStackControl />
      </FormContentsLayout>
      <div className='w-full my-4 flex items-center justify-center space-x-2'>
        <ResetProjectUpdButton />
        <SaveProjectUpdButton
          projectId={projectId}
          userPMAuthCode={userPMAuthCode}
        />
      </div>
    </FormContainerLayout>
  );
};

export default ProjectUpdFormContainer;
