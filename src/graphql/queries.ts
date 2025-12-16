// src/lib/queries/queries.ts
import { gql } from '@apollo/client';

// 1. Apenas os dados básicos da Pool (sem o histórico aninhado)
export const GET_TOP_POOLS = gql`
  query GetTopPools {
    pools(
      first: 10
      orderBy: totalValueLockedUSD
      orderDirection: desc
      where: { volumeUSD_gt: "10000", txCount_gt: "100" }
    ) {
      id
      feeTier
      totalValueLockedUSD
      token0 {
        symbol
        id
      }
      token1 {
        symbol
        id
      }
    }
  }
`;

// 2. Query para buscar o histórico de VÁRIAS piscinas de uma vez
export const GET_POOLS_HISTORY = gql`
  query GetPoolsHistory($poolIds: [String!]!) {
    poolDayDatas(
      first: 300
      orderBy: date
      orderDirection: desc
      where: { pool_in: $poolIds }
    ) {
      date
      volumeUSD
      pool {
        id
      }
    }
  }
`;
