import PositionSelect from '@/features/core/position/ui/PositionSelect';
import { useRecoilState } from 'recoil';
import { signUpFormFieldSelector } from '@/store/signup/SignUpFormStateStore';
import { Field, Label } from '@headlessui/react';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const SignUpPositionControl = () => {
  const [positionId, setPositionId] = useRecoilState(
    signUpFormFieldSelector('positionId'),
  );

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>
        포지션
        <span className='text-red-500 required-dot ml-1.5 align-middle'>*</span>
      </Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='포지션을 선택해주세요' />
        }
      >
        <PositionSelect
          positionId={positionId}
          onChange={(item) => setPositionId(item)}
          required
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default SignUpPositionControl;
