import MultiSelect from '@/shared/ui/MultiSelect';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { useTechStackList } from '@/features/techStack/api/getTechStackList';

type TechStackSelectProps = {
  selectedTechStackIds: string[];
  onChange: (item: string[]) => void;
  placeholder?: string;
  required?: boolean;
};

const TechStackSelect = ({
  selectedTechStackIds,
  onChange,
  placeholder,
  required,
}: TechStackSelectProps) => {
  const {
    data: { data },
  } = useTechStackList();

  const techStackList = data.map(({ techStackId, techStackName }) => ({
    name: techStackName,
    value: bigIntToString(techStackId),
  }));

  const selectedTechStacks = techStackList.filter(({ value }) =>
    selectedTechStackIds.includes(value),
  );

  return (
    <MultiSelect
      values={selectedTechStacks}
      setValues={(item) => onChange(item.map(({ value }) => value))}
      items={techStackList}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default TechStackSelect;
