import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import ResetProjectConfigButton from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/ResetProjectConfigButton';
import ProjectConfigTechStackControl from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/inputControl/ProjectConfigTechStackControl';
import SaveProjectConfigButton from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/SaveProjectConfigButton';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContents from '@/features/projectDetail/config/layouts/ConfigContents';
import ProjectConfigNameControl from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/inputControl/ProjectConfigNameControl';
import ProjectConfigSubjectControl from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/inputControl/ProjectConfigSubjectControl';
import ProjectConfigDateControl from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/inputControl/ProjectConfigDateControl';
import { useProjectConfig } from '@/features/project/api/generalConfig/getProjectConfig';
import { useEffect } from 'react';
import {
  projectConfigFormLoadingSelector,
  projectConfigFormStateStore,
} from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';
import ProjectConfigFormSkeleton from '@/features/projectPage/ui/projectDetail/projectConfig/projectInfoEditor/ProjectConfigFormSkeleton';

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
    <ConfigContainer>
      <ConfigSummary>프로젝트 정보</ConfigSummary>
      <ConfigContents>
        <ProjectConfigNameControl />
        <ProjectConfigSubjectControl />
        <ProjectConfigDateControl />
        <ProjectConfigTechStackControl />
      </ConfigContents>
      <div className='w-full my-4 flex items-center justify-center space-x-2'>
        <ResetProjectConfigButton />
        <SaveProjectConfigButton />
      </div>
    </ConfigContainer>
  );
};

export default ProjectConfigForm;
