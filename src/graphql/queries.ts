import { gql } from '@apollo/client';

export const GET_TOP_POOLS = gql`
  query GetTopPools {
    pools(first: 10, orderBy: volumeUSD, orderDirection: desc) {
      id
      volumeUSD
      totalValueLockedUSD
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
    }
  }
`;
