import Select from '@/shared/ui/Select';
import { ProjectAuthMap } from '@/features/projectMngAuth/types/projectAuth';
import { usePMAuthList } from '@/features/projectMngAuth/api/getPMAuthList';

type CrewAuthSelectItem = {
  name: ProjectAuthMap['name'];
  value: ProjectAuthMap['code'];
};

type PMAuthSelectorProps = {
  value: CrewAuthSelectItem;
  setValue: (value: CrewAuthSelectItem) => void;
};

const PMAuthSelector = ({ value, setValue }: PMAuthSelectorProps) => {
  const {
    data: {
      data: { content: pmAuthOptions },
    },
  } = usePMAuthList();

  const pmAuthOptionSelectItems = pmAuthOptions.map((crew) => ({
    name: crew.name,
    value: crew.code,
  }));

  return (
    <div className='w-[230px] mobile:w-[95px]'>
      <Select
        items={pmAuthOptionSelectItems}
        setValue={setValue}
        value={value}
      />
    </div>
  );
};

export default PMAuthSelector;
