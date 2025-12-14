import { gql } from '@apollo/client';

export const GET_TOP_POOLS = gql`
  query GetTopPools {
    pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      feeTier
      totalValueLockedUSD
      volumeUSD
    }
  }
`;
