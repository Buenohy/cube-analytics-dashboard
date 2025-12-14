import { ApolloClient, InMemoryCache } from '@apollo/client';

const UNISWAP_V3_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

export const client = new ApolloClient({
  uri: UNISWAP_V3_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});
