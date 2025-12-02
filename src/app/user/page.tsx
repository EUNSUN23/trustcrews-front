'use client';

import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/app/user/_components/UserProfileSkeleton';
import UserTrustScoreSkeleton from '@/app/user/_components/UserTrustScoreSkeleton';
import UserProjectHistorySkeleton from '@/app/user/_components/UserProjectHistorySkeleton';

const MyProjectHistory = dynamic(
  () => import('@/app/user/_components/UserProjectHistory'),
  { ssr: false, loading: () => <UserProjectHistorySkeleton /> },
);

const UserProfile = dynamic(
  () => import('@/app/user/_components/UserProfile'),
  { ssr: false, loading: () => <UserProfileSkeleton /> },
);

const UserTrustScore = dynamic(
  () => import('@/app/user/_components/UserTrustScore'),
  { ssr: false, loading: () => <UserTrustScoreSkeleton /> },
);

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
