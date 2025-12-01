import PositionSelect from '@/features/position/ui/PositionSelect';
import { userInfoFormFieldSelector } from '@/store/useProfileEditor/UserInfoFormStateStore';
import { useRecoilState } from 'recoil';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';

const UpdatePositionControl = () => {
  const [positionId, setPositionId] = useRecoilState(
    userInfoFormFieldSelector('positionId'),
  );

  const handleChangeSelect = (item: string) => {
    setPositionId(item);
  };

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>
        포지션
        <span className='text-red-500 required-dot ml-1.5 align-middle'>*</span>
      </Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='포지션을 선택해 주세요.' />
        }
      >
        <PositionSelect
          positionId={positionId}
          onChange={handleChangeSelect}
          required
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default UpdatePositionControl;
