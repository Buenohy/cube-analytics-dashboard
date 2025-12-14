import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const UNISWAP_SUBGRAPH_ID = '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV';
const API_KEY = process.env.NEXT_PUBLIC_GRAPH_API_KEY;

const UNISWAP_V3_API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/${UNISWAP_SUBGRAPH_ID}`;

export const client = new ApolloClient({
  link: new HttpLink({
    uri: UNISWAP_V3_API_URL,
    fetch,
  }),
  cache: new InMemoryCache(),
});
