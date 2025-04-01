import React from 'react';
import Navigator from '@/components/ui/error/Navigator';
import StyledLink from '@/components/ui/StyledLink';
import ErrorPageContainer from '@/components/ui/error/ErrorPageContainer';
import ErrorMessage from '@/components/ui/error/ErrorMessage';
import { HttpStatus } from '@/app/api/_interceptor/utils/httpStatus';

function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { error: string };
}) {
  const status = parseInt(params.slug, 10);
  return (
    <ErrorPageContainer className=''>
      <p className=' text-8xl font-semibold text-secondary/50 leading-relaxed'>
        {status}
      </p>
      <ErrorMessage className='leading-loose'>
        {searchParams.error}
      </ErrorMessage>
      {status === HttpStatus.UNAUTHORIZED && (
        <Navigator className=''>
          <StyledLink href='/login'>로그인</StyledLink>
          <StyledLink href='/'>홈으로</StyledLink>
        </Navigator>
      )}
      {status === HttpStatus.FORBIDDEN && (
        <Navigator>
          <StyledLink href='/'>홈으로</StyledLink>
        </Navigator>
      )}
    </ErrorPageContainer>
  );
}

export default Page;
