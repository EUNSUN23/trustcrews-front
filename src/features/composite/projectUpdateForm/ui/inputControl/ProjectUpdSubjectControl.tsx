import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { projectUpdFormFieldSelector } from '@/features/composite/projectUpdateForm/store/ProjectUpdFormStateStore';

const ProjectUpdSubjectControl = () => {
  const [projectSubject, setProjectSubject] = useRecoilState(
    projectUpdFormFieldSelector('projectSubject'),
  );

  return (
    <Row>
      <Input
        id='projectSubject'
        label='프로젝트 주제'
        placeholder='주제를 입력해주세요.'
        value={projectSubject}
        onChange={(e) => setProjectSubject(e.target.value)}
      />
    </Row>
  );
};

export default ProjectUpdSubjectControl;
