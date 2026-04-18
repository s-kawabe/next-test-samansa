'use client';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { ReactNode } from 'react';
import { makeClient } from '@/lib/apolloClient';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
  );
}
