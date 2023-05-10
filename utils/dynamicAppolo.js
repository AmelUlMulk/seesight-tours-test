import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from '../apollo-client';

const DynamicAppolo = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DynamicAppolo;
