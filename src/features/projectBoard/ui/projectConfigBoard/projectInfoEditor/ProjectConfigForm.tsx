import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import ResetProjectConfigButton from '@/features/projectBoard/ui/projectConfigBoard/projectInfoEditor/ResetProjectConfigButton';
import ProjectConfigTechStackControl from '@/features/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigTechStackControl';
import SaveProjectConfigButton from '@/features/projectBoard/ui/projectConfigBoard/projectInfoEditor/SaveProjectConfigButton';
import ConfigLayout from '@/features/projectBoard/ui/projectConfigBoard/ConfigLayout';
import ConfigSummaryLayout from '@/features/projectBoard/ui/projectConfigBoard/ConfigSummaryLayout';
import ConfigContentsLayout from '@/features/projectBoard/ui/projectConfigBoard/ConfigContentsLayout';
import ProjectConfigNameControl from '@/features/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigNameControl';
import ProjectConfigSubjectControl from '@/features/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigSubjectControl';
import ProjectConfigDateControl from '@/features/projectBoard/ui/projectConfigBoard/projectInfoEditor/inputControl/ProjectConfigDateControl';
import { useProjectConfig } from '@/features/project/api/generalConfig/getProjectConfig';
import { useEffect } from 'react';
import {
  projectConfigFormLoadingSelector,
  projectConfigFormStateStore,
} from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';
import ProjectConfigFormSkeleton from '@/features/projectBoard/ui/projectConfigBoard/projectInfoEditor/ProjectConfigFormSkeleton';

const ProjectConfigForm = () => {
  const isFormLoading = useRecoilValue(projectConfigFormLoadingSelector);
  const setProjectConfigForm = useSetRecoilState(projectConfigFormStateStore);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data: projectInfo },
  } = useProjectConfig(numStrToBigInt(projectId));

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
