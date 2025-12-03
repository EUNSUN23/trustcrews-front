import { useRecoilState } from 'recoil';
import Input from '@/shared/ui/Input';
import { postUpdFormFieldSelector } from '@/features/composite/postUpdateForm/store/PostUpdFormStateStore';

const PostUpdTitleControl = () => {
  const [title, setTitle] = useRecoilState(postUpdFormFieldSelector('title'));

  return (
    <Input
      id='title'
      label='게시글 제목'
      placeholder='게시글 제목'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default PostUpdTitleControl;
