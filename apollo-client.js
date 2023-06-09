import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
  uri: String(process.env.NEXT_PUBLIC_URI),

  headers: {
    [String(process.env.NEXT_PUBLIC_CLIENT_HEADER)]:
      String(process.env.NEXT_PUBLIC_CLIENT_VALUE) ?? ''
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`, 'Network error');
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;
