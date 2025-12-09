'use client';

import PostsTitleFilter from '@/features/composite/postsBoard/ui/PostsTitleFilter';
import PostsPositionFilter from '@/features/composite/postsBoard/ui/postPositionFilter';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import CardListSkeleton from '@/shared/ui/skeleton/CardListSkeleton';
import PostsTechStackFilter from '@/features/composite/postsBoard/ui/postsTechStackFilter';
import { PostListContainer } from '@/features/composite/postsBoard/ui/postList/PostListContainer';

const PostsBoardContainer = () => {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <section
        aria-label='게시글 검색'
        className='mt-6 flex justify-start mobile:block mobile:space-y-5'
      >
        <div className='flex justify-start space-x-5 mr-auto'>
          <PostsTechStackFilter />
          <PostsPositionFilter />
        </div>
        <PostsTitleFilter />
      </section>
      <section className='mt-6 mobile:mt-2'>
        <FieldQueryBoundary
          errorFallbackSize='lg'
          suspenseFallback={<CardListSkeleton itemCount={8} />}
        >
          <PostListContainer />
        </FieldQueryBoundary>
      </section>
    </section>
  );
};

export default PostsBoardContainer;
