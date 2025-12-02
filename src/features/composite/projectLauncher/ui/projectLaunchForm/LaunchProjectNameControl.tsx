import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { projectFormFieldSelector } from '@/features/composite/projectLauncher/store/ProjectFormStateStore';
import { ChangeEvent } from 'react';

const LaunchProjectNameControl = () => {
  const [name, setProjectName] = useRecoilState(
    projectFormFieldSelector('name'),
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <Row>
      <Input
        id='projectName'
        label='프로젝트 이름'
        value={name}
        onChange={handleChangeInput}
      />
    </Row>
  );
};

export default LaunchProjectNameControl;
