'use client';

import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { HttpError } from '@/shared/utils/HttpError';
import { HttpStatusCode } from 'axios';

type RootProviderProps = {
  children: ReactNode;
};

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
      },
      mutations: {
        throwOnError: (error) => {
          return (
            error instanceof HttpError &&
            (error.status === HttpStatusCode.ServiceUnavailable ||
              error.status === HttpStatusCode.InternalServerError ||
              error.status === HttpStatusCode.Unauthorized)
          );
        },
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const ClientProvider = ({ children }: RootProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
};

export default ClientProvider;
