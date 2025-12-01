import UserProfileSkeleton from '@/app/user/_components/UserProfileSkeleton';
import UserTrustScoreSkeleton from '@/app/user/_components/UserTrustScoreSkeleton';
import UserProjectHistorySkeleton from '@/app/user/_components/UserProjectHistorySkeleton';

const UserPageLoading = () => {
  return (
    <>
      <UserProfileSkeleton />
      <UserTrustScoreSkeleton />
      <UserProjectHistorySkeleton />
    </>
  );
};

export default UserPageLoading;
