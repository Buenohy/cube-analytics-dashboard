import { client } from '@/lib/apollo-client';
import { GET_TOP_POOLS } from '@/graphql/queries';
import { MoveRight } from 'lucide-react';

// Definindo o tipo dos dados para o TypeScript não reclamar
interface Pool {
  id: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  token0: { symbol: string };
  token1: { symbol: string };
}

// Função auxiliar de formatação
const formatCurrency = (value: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(parseFloat(value));
};

export default async function PoolList() {
  // O Fetch acontece AQUI dentro do componente
  const { data } = await client.query({
    query: GET_TOP_POOLS,
    context: {
      fetchOptions: {
        next: { revalidate: 60 }, // Revalida os dados a cada 60 segundos (ISR)
      },
    },
  });

  const pools: Pool[] = data.pools;

  return (
    <div className="grid gap-4">
      {/* Cabeçalho da Tabela */}
      <div className="grid grid-cols-3 bg-slate-900 p-4 rounded-t-lg font-semibold text-slate-300 text-sm uppercase tracking-wider">
        <div>Par (Pool)</div>
        <div>TVL (Liquidez)</div>
        <div>Volume (Total)</div>
      </div>

      {/* Lista de Pools */}
      {pools.map((pool) => (
        <div
          key={pool.id}
          className="grid grid-cols-3 items-center bg-slate-900/50 p-4 border-b border-slate-800 hover:bg-slate-800 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-slate-700 px-2 py-1 rounded text-sm group-hover:bg-pink-600 transition-colors">
              {pool.token0.symbol}
            </span>
            <MoveRight size={16} className="text-slate-500" />
            <span className="bg-slate-700 px-2 py-1 rounded text-sm group-hover:bg-pink-600 transition-colors">
              {pool.token1.symbol}
            </span>
          </div>

          <div className="text-slate-300 text-sm">
            {formatCurrency(pool.totalValueLockedUSD)}
          </div>

          <div className="text-green-400 font-mono text-sm">
            {formatCurrency(pool.volumeUSD)}
          </div>
        </div>
      ))}
    </div>
  );
}
