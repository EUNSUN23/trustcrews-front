'use client';

import { Fragment, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DropDownItem, ResponseBody, UserBasicInfo } from '@/utils/type';
import Avatar from '@/components/ui/Avatar';
import { useQuery } from '@tanstack/react-query';
import { getSimpleUser } from '@/service/user/user';
import UserMenuSkeleton from '@/components/ui/skeleton/header/UserMenuSkeleton';
import useLogout from '@/hooks/user/useLogout';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import Link from 'next/link';
import { classNames } from '@/utils/common';
import { isQueryDataReady } from '@/hooks/common/useProjectInfoSummary';
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

function UserMenu() {
  const router = useRouter();
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const { logout } = useLogout();

  const { data, isPending, isRefetching, isError, isRefetchError } = useQuery<
    ResponseBody<UserBasicInfo>,
    Error,
    ResponseBody<UserBasicInfo>
  >({
    queryKey: ['simpleUserInfo'],
    queryFn: getSimpleUser,
    staleTime: 0,
    enabled: hasCookie('user_id') as boolean,
  });

  const isUserDataPreparing = isPending || isRefetching;
  const isUserDataError = isError || isRefetchError;
  const isUserDataReady = isQueryDataReady(
    isUserDataPreparing,
    isUserDataError,
    data,
  );

  useEffect(() => {
    if (isUserDataError) {
      router.replace('/login');
    }
  }, [isUserDataError, router]);

  if (isUserDataReady) {
    const { nickname, profileImgSrc } = data.data!;

    const items: DropDownItem[] = [
      { name: '내 프로필', value: '/user/profile' },
      {
        name: '로그아웃',
        value: '/user/logout',
        onClickHandler: () => logout(),
      },
    ];

    return (
      <div className='flex items-center mx-2 space-x-2'>
        <div aria-hidden='true' className='flex items-stretch space-x-2'>
          <Avatar size='2xs' alt='사용자 이미지' src={profileImgSrc} />
          {isDesktop && (
            <span className='text-grey90 leading-loose'>{nickname}</span>
          )}
        </div>
        <Menu as='div' className='relative flex text-center'>
          <div>
            <MenuButton className='flex items-center text-gray-400 hover:text-gray-600'>
              <span className='sr-only'>{`${nickname}의 사용자 메뉴`}</span>
              <FaChevronDown className='h-4 w-4' aria-hidden='true' />
            </MenuButton>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <MenuItems className='absolute right-0 z-10 mt-5 tablet:min-w-[120px] mobile:min-w-[90px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1 '>
                {items.map((v) => (
                  <MenuItem key={v.value}>
                    {({ focus }) =>
                      v.onClickHandler ? (
                        <span
                          onClick={() => v.onClickHandler!(v.value)}
                          className={classNames(
                            focus
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                          )}
                        >
                          {v.name}
                        </span>
                      ) : (
                        <Link
                          href={v.value}
                          className={classNames(
                            focus
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                          )}
                        >
                          {v.name}
                        </Link>
                      )
                    }
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    );
  }

  if (isUserDataPreparing) return <UserMenuSkeleton />;
}

export default UserMenu;
