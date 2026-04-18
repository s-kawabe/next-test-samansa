import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

const GRAPHQL_URI = 'https://develop.api.samansa.com/graphql';

export const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URI }),
  cache: new InMemoryCache(),
});
