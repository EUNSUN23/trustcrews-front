import { useRecoilState } from 'recoil';
import MultiPositionSelect from '@/features/core/position/ui/MultiPositionSelect';
import { postUpdFormFieldSelector } from '@/features/composite/postUpdateForm/store/PostUpdFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { Field, Label } from '@headlessui/react';

const PostUpdPositionsControl = () => {
  const [positionsId, setPositionsId] = useRecoilState(
    postUpdFormFieldSelector('positionIds'),
  );

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>모집 분야</Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='모집 분야를 선택해주세요.' />
        }
      >
        <MultiPositionSelect
          positions={positionsId}
          setPositions={(item) => setPositionsId(item)}
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default PostUpdPositionsControl;
