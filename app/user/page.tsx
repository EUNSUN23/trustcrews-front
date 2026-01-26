'use client';

import dynamic from 'next/dynamic';
import UserProfileSkeleton from './_components/UserProfileSkeleton';
import UserTrustScoreSkeleton from './_components/UserTrustScoreSkeleton';
import UserProjectHistorySkeleton from './_components/UserProjectHistorySkeleton';

const MyProjectHistory = dynamic(
  () => import('./_components/UserProjectHistory'),
  { ssr: false, loading: () => <UserProjectHistorySkeleton /> },
);

const UserProfile = dynamic(() => import('./_components/UserProfile'), {
  ssr: false,
  loading: () => <UserProfileSkeleton />,
});

const UserTrustScore = dynamic(() => import('./_components/UserTrustScore'), {
  ssr: false,
  loading: () => <UserTrustScoreSkeleton />,
});

const UserPage = () => {
  return (
    <>
      <UserProfile />
      <UserTrustScore />
      <MyProjectHistory />
    </>
  );
};

export default UserPage;
