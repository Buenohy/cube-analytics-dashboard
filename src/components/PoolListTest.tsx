import { client } from '@/lib/apollo-client';
import { GET_TOP_POOLS, GET_POOLS_HISTORY } from '@/graphql/queries';
import { formatCompact, formatPercent, calculateAPR } from '@/lib/calc';
import TokenIcon from './TokenIcon';

interface PoolBasic {
  id: string;
  feeTier: string;
  totalValueLockedUSD: string;
  token0: { symbol: string; id: string };
  token1: { symbol: string; id: string };
}

interface PoolDayData {
  date: number;
  volumeUSD: string;
  pool: { id: string };
}

export default async function PoolList() {
  const { data: poolsData } = await client.query({
    query: GET_TOP_POOLS,
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });

  const pools: PoolBasic[] = poolsData.pools;
  const poolIds = pools.map((p) => p.id);

  const { data: historyData } = await client.query({
    query: GET_POOLS_HISTORY,
    variables: { poolIds: poolIds },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });

  const allHistory: PoolDayData[] = historyData.poolDayDatas;

  return (
    <div className="w-full overflow-x-auto bg-[#0d0e12] p-4 rounded-xl border border-slate-800">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 text-xs border-b border-slate-800">
            <th className="py-4 pl-4 font-normal">#</th>
            <th className="py-4 font-normal">Pool</th>
            <th className="py-4 font-normal">Protocol</th>
            <th className="py-4 font-normal">TVL</th>
            <th className="py-4 font-normal">Pool APR</th>
            <th className="py-4 font-normal">1D vol</th>
            <th className="py-4 font-normal">30D vol</th>
            <th className="py-4 pr-4 font-normal text-right">Vol/TVL</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool, index) => {
            const poolHistory = allHistory.filter(
              (day) => day.pool.id === pool.id
            );
            const tvl = parseFloat(pool.totalValueLockedUSD);
            const vol1d = parseFloat(poolHistory[0]?.volumeUSD || '0');
            const vol30d = poolHistory.reduce(
              (acc, day) => acc + parseFloat(day.volumeUSD),
              0
            );
            const apr = calculateAPR(vol1d, pool.feeTier, tvl);
            const volTvlRatio = tvl > 0 ? vol1d / tvl : 0;
            const feeTierPercent = parseFloat(pool.feeTier) / 10000;

            const imgUrl = (address: string) =>
              `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

            return (
              <tr
                key={pool.id}
                className="hover:bg-slate-800/40 transition-colors text-sm border-b border-slate-900/50 last:border-0"
              >
                <td className="py-4 pl-4 text-slate-400">{index + 1}</td>

                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <TokenIcon
                        src={imgUrl(pool.token0.id)}
                        alt={pool.token0.symbol}
                      />
                      <TokenIcon
                        src={imgUrl(pool.token1.id)}
                        alt={pool.token1.symbol}
                      />
                    </div>
                    <span className="font-semibold text-white">
                      {pool.token0.symbol}/{pool.token1.symbol}
                    </span>
                    <span className="bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded">
                      {feeTierPercent}%
                    </span>
                  </div>
                </td>

                <td className="py-4 text-slate-400">v3</td>
                <td className="py-4 text-white">{formatCompact(tvl)}</td>
                <td className="py-4 text-green-400">{formatPercent(apr)}</td>
                <td className="py-4 text-white">{formatCompact(vol1d)}</td>
                <td className="py-4 text-white">{formatCompact(vol30d)}</td>
                <td className="py-4 pr-4 text-right text-white">
                  {volTvlRatio < 0.01 ? '<0.01' : volTvlRatio.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
