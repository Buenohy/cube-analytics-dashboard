import { Suspense } from 'react';
import PoolList from '@/components/PoolList';
import { Coins } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Estático (Carrega instantaneamente) */}
        <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-600 rounded-lg">
              <Coins className="text-white" size={24} />
            </div>
            Uniswap V3 Explorer
          </h1>
          <p className="text-slate-400 ml-1">
            Monitoramento de liquidez e volume em tempo real via The Graph.
          </p>
        </header>

        {/* Área de Dados (Carrega Assincronamente) */}
        <section>
          <Suspense fallback={<LoadingState />}>
            <PoolList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

// Componente simples de Loading (Skeleton)
function LoadingState() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-slate-900 rounded w-full"></div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-16 bg-slate-900/50 rounded w-full"></div>
      ))}
    </div>
  );
}
