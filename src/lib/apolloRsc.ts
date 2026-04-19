import type { OperationVariables, QueryOptions } from '@apollo/client';
import { makeClient } from './apolloClient';

export async function query<
  TData,
  TVariables extends OperationVariables = OperationVariables,
>(options: QueryOptions<TVariables, TData>) {
  const client = makeClient();
  return client.query<TData, TVariables>(options);
}
