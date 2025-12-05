'use client';

import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import UserMenuSkeleton from '@/app/_components/header/user-menu/UserMenuSkeleton';
import { LoginNavigation } from '@/app/_components/header/header-navigation/LoginNavigation';
import { useRecoilValue } from 'recoil';
import { authStateStore } from '@/shared/store/AuthStateStore';
import UserMenu from '@/app/_components/header/user-menu/UserMenu';

export const AuthArea = () => {
  const { isAuthorized } = useRecoilValue(authStateStore);
  return (
    <div>
      {isAuthorized ? (
        <FieldQueryBoundary
          isThrowingAllowed={false}
          suspenseFallback={<UserMenuSkeleton />}
          errorFallback={(_props) => <LoginNavigation />}
        >
          <UserMenu />
        </FieldQueryBoundary>
      ) : (
        <LoginNavigation />
      )}
    </div>
  );
};
