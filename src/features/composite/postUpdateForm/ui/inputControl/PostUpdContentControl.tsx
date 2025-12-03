import { useRecoilState } from 'recoil';
import TextArea from '@/shared/ui/TextArea';
import { postUpdFormFieldSelector } from '@/features/composite/postUpdateForm/store/PostUpdFormStateStore';

const PostUpdContentControl = () => {
  const [content, setContent] = useRecoilState(
    postUpdFormFieldSelector('content'),
  );

  return (
    <TextArea
      id='content'
      label='프로젝트 소개'
      placeholder='프로젝트에 대해 소개해주세요.'
      rows={10}
      cols={25}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default PostUpdContentControl;
