'use client';

import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { client } from '../lib/apolloClient';

export function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
