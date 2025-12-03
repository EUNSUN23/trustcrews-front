import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { projectUpdFormFieldSelector } from '@/features/composite/projectUpdateForm/store/ProjectUpdFormStateStore';

const ProjectUpdNameControl = () => {
  const [projectName, setProjectName] = useRecoilState(
    projectUpdFormFieldSelector('projectName'),
  );

  return (
    <Row>
      <Input
        id='projectName'
        label='프로젝트 이름'
        placeholder='이름을 입력해주세요.'
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </Row>
  );
};

export default ProjectUpdNameControl;
