import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { createApolloClient } from './apolloClientFactory';

export const { getClient, query } = registerApolloClient(createApolloClient);
