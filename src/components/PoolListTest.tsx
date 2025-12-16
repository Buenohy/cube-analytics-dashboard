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
    <div className="w-full bg-[#0d0e12] rounded-2xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto no-scrollbar relative">
        <table className="w-full border-collapse min-w-190">
          <thead>
            <tr className="text-gray-500 text-xs font-medium border-b border-white/5">
              <th className="h-10 pl-4 w-10 sticky left-0 z-30 bg-[#0d0e12] text-left">
                #
              </th>

              <th className="h-10 sticky left-10 z-30 bg-[#0d0e12] pr-8 text-left shadow-[10px_0_20px_-5px_rgba(0,0,0,0.8)] clip-path-inset">
                Pool
              </th>

              <th className="h-10 px-4 text-right">TVL</th>
              <th className="h-10 px-4 text-right">APR</th>
              <th className="h-10 px-4 text-right">1D Vol</th>
              <th className="h-10 px-4 text-right">30D Vol</th>
              <th className="h-10 px-4 pr-6 text-right">Vol/TVL</th>
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

              return (
                <tr
                  key={pool.id}
                  className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 h-18"
                >
                  <td className="sticky left-0 z-20 bg-[#0d0e12] group-hover:bg-[#13141b] pl-4 text-gray-500 text-sm font-medium">
                    {index + 1}
                  </td>

                  <td className="sticky left-10 z-20 bg-[#0d0e12] group-hover:bg-[#13141b] pr-8 shadow-[10px_0_20px_-5px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center">
                      <div className="relative flex items-center mr-3 w-[42px]">
                        <div className="z-10 relative">
                          <TokenIcon
                            address={pool.token0.id}
                            alt={pool.token0.symbol}
                          />
                        </div>
                        <div className="-ml-3 z-0 relative opacity-90">
                          <TokenIcon
                            address={pool.token1.id}
                            alt={pool.token1.symbol}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <span className="text-white font-semibold text-[15px] leading-tight">
                          {pool.token0.symbol}/{pool.token1.symbol}
                        </span>
                        <span className="bg-[#1b1e29] text-gray-400 text-[10px] px-1.5 py-0.5 rounded-[6px] w-fit mt-1 font-medium">
                          {feeTierPercent}%
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 text-white font-medium text-right whitespace-nowrap">
                    {formatCompact(tvl)}
                  </td>
                  <td className="px-4 text-[#27e3ab] font-medium text-right whitespace-nowrap">
                    {formatPercent(apr)}
                  </td>
                  <td className="px-4 text-white text-right whitespace-nowrap">
                    {formatCompact(vol1d)}
                  </td>
                  <td className="px-4 text-gray-400 text-right whitespace-nowrap">
                    {formatCompact(vol30d)}
                  </td>
                  <td className="px-4 pr-6 text-gray-400 text-right whitespace-nowrap">
                    {volTvlRatio < 0.01 ? '<0.01' : volTvlRatio.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
