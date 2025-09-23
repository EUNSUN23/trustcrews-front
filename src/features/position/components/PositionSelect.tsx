import Select from '@/shared/ui/Select';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { usePositionList } from '@/features/position/api/getPositionList';

type PositionSelectProps = {
  positionId: string;
  onChange: (item: string) => void;
  required?: boolean;
};

const DEFAULT_POSITION_SELECT = {
  name: '포지션',
  value: '',
};

const PositionSelect = ({
  positionId,
  onChange,
  required,
}: PositionSelectProps) => {
  const {
    data: { data },
  } = usePositionList();

  const positionList = [
    DEFAULT_POSITION_SELECT,
    ...data.map(({ positionId, positionName }) => ({
      name: positionName,
      value: bigIntToString(positionId),
    })),
  ];

  const selected = positionList.find(({ value }) => value === positionId);

  return (
    <Select
      value={selected || DEFAULT_POSITION_SELECT}
      setValue={(item) => onChange(item.value)}
      items={positionList}
      placeholder='포지션을 선택해주세요.'
      required={required}
    />
  );
};

export default PositionSelect;
