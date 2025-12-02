import UserProfile from '@/app/user/_components/UserProfile';
import UserProjectHistory from '@/app/user/_components/UserProjectHistory';
import UserTrustScore from '@/app/user/_components/UserTrustScore';
import { getUserDetailInfo } from '@/features/core/user/api/getUserDetailInfo';
import { getMyProjectHistory } from '@/features/core/projectHistory/api/getMyProjectHistory';

const UserPage = async () => {
  const getUserProfile = getUserDetailInfo();
  const getUserProjectHistory = getMyProjectHistory(5);

  const [userDetailRes, userProjectHistoryRes] = await Promise.all([
    getUserProfile,
    getUserProjectHistory,
  ]);

  const userDetailData = userDetailRes.data;
  const userProjectHistoryData = userProjectHistoryRes.data;

  return (
    <>
      <UserProfile data={userDetailData} />
      <UserTrustScore
        trustScore={userDetailData.trustScore}
        trustGrade={userDetailData.trustGrade.trustGradeName}
      />
      <UserProjectHistory data={userProjectHistoryData} />
    </>
  );
};

export default UserPage;
