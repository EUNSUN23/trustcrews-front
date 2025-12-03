import { useRecoilState } from 'recoil';
import Input from '@/shared/ui/Input';
import { postUpdFormFieldSelector } from '@/features/composite/postUpdateForm/store/PostUpdFormStateStore';

const PostUpdContactControl = () => {
  const [contact, setContact] = useRecoilState(
    postUpdFormFieldSelector('contact'),
  );

  return (
    <Input
      id='contact'
      label='연락 방법'
      placeholder='오픈 카톡 링크 / 이메일 / 구글 폼 주소'
      value={contact}
      onChange={(e) => setContact(e.target.value)}
    />
  );
};

export default PostUpdContactControl;
