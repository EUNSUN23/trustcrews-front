import Select from '@/shared/ui/Select';
import { ProjectAuth } from '@/entities/projectAuth';
import { usePMAuthList } from '@/features/core/projectAuth/api/getPMAuthList';

type CrewAuthSelectItem = {
  name: ProjectAuth['name'];
  value: ProjectAuth['code'];
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
