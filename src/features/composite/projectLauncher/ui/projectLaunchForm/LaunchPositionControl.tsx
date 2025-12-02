import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { postFormFieldSelector } from '@/features/composite/projectLauncher/store/PostFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import MultiPositionSelect from '@/features/core/position/ui/MultiPositionSelect';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const LaunchPositionControl = () => {
  const [positionIds, setPositionIds] = useRecoilState(
    postFormFieldSelector('positionIds'),
  );

  const handleChangeSelect = (item: readonly string[]) => {
    setPositionIds(item);
  };

  return (
    <Row>
      <Field>
        <Label className='block text-gray-700 mobile:text-sm'>모집 분야</Label>
        <FieldQueryBoundary
          suspenseFallback={
            <SelectSkeleton placeholder='모집 분야를 선택해주세요.' />
          }
        >
          <MultiPositionSelect
            positions={positionIds}
            setPositions={handleChangeSelect}
          />
        </FieldQueryBoundary>
      </Field>
    </Row>
  );
};

export default LaunchPositionControl;
