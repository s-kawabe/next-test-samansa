import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

const GRAPHQL_URI = 'https://develop.api.samansa.com/graphql';

export function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: GRAPHQL_URI }),
  });
}

// NOTE: pagination cache example
// import { relayStylePagination } from "@apollo/client/utilities";
// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         comments: relayStylePagination(),
//       },
//     },
//   },
// });
