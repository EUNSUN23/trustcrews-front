import { useRecoilValue } from 'recoil';
import { selectedTechStackState } from '@/features/composite/postsBoard/store/TechStackFilterStateStore';
import {
  postSearchValue,
  selectedPositionState,
} from '@/features/composite/postsBoard/store/PostSearchStateStore';
import PostList from '@/features/composite/postsBoard/ui/postList/PostList';

export const PostListContainer = () => {
  const techStacks = useRecoilValue(selectedTechStackState);
  const { value: position } = useRecoilValue(selectedPositionState);
  const keyword = useRecoilValue(postSearchValue);

  const filter = { techStacks, position, keyword };

  return <PostList filter={filter} />;
};
