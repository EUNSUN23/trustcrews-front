import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import ResetProjectConfigButton from '@/features/composite/projectBoard/ui/projectConfigBoard/projectInfoEditor/ResetProjectConfigButton';
import ProjectConfigTechStackControl from '@/features/composite/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigTechStackControl';
import SaveProjectConfigButton from '@/features/composite/projectBoard/ui/projectConfigBoard/projectInfoEditor/SaveProjectConfigButton';
import ConfigLayout from '@/features/composite/projectBoard/ui/projectConfigBoard/ConfigLayout';
import ConfigSummaryLayout from '@/features/composite/projectBoard/ui/projectConfigBoard/ConfigSummaryLayout';
import ConfigContentsLayout from '@/features/composite/projectBoard/ui/projectConfigBoard/ConfigContentsLayout';
import ProjectConfigNameControl from '@/features/composite/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigNameControl';
import ProjectConfigSubjectControl from '@/features/composite/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigSubjectControl';
import ProjectConfigDateControl from '@/features/composite/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigDateControl';
import { useEffect } from 'react';
import {
  projectConfigFormLoadingSelector,
  projectConfigFormStateStore,
} from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';
import ProjectConfigFormSkeleton from '@/features/composite/projectBoard/ui/projectConfigBoard/projectInfoEditor/ProjectConfigFormSkeleton';
import { useProjectSummaryInfo } from '@/features/core/project/api/getProjectInfoSummary';

const ProjectConfigForm = () => {
  const isFormLoading = useRecoilValue(projectConfigFormLoadingSelector);
  const setProjectConfigForm = useSetRecoilState(projectConfigFormStateStore);
  const projectId = useRecoilValue(projectIdState);

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
      setProjectConfigForm({
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
    setProjectConfigForm,
  ]);

  if (isFormLoading) return <ProjectConfigFormSkeleton />;

  return (
    <ConfigLayout>
      <ConfigSummaryLayout>프로젝트 정보</ConfigSummaryLayout>
      <ConfigContentsLayout>
        <ProjectConfigNameControl />
        <ProjectConfigSubjectControl />
        <ProjectConfigDateControl />
        <ProjectConfigTechStackControl />
      </ConfigContentsLayout>
      <div className='w-full my-4 flex items-center justify-center space-x-2'>
        <ResetProjectConfigButton />
        <SaveProjectConfigButton />
      </div>
    </ConfigLayout>
  );
};

export default ProjectConfigForm;
