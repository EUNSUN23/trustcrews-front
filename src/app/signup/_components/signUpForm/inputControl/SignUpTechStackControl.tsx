import TechStackSelect from '@/features/core/techStack/ui/TechStackSelect';
import { signUpFormFieldSelector } from '@/store/signup/SignUpFormStateStore';
import { useRecoilState } from 'recoil';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';

const SignUpTechStackControl = () => {
  const [techStackIds, setTechStackIds] = useRecoilState(
    signUpFormFieldSelector('techStackIds'),
  );

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>
        관심 스택
        <span className='text-red-500 required-dot ml-1.5 align-middle'>*</span>
      </Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='관심 스택을 선택해주세요.' />
        }
      >
        <TechStackSelect
          selectedTechStackIds={techStackIds}
          onChange={(item) => setTechStackIds([...item])}
          placeholder='관심 스택을 선택해주세요.'
          required
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default SignUpTechStackControl;
