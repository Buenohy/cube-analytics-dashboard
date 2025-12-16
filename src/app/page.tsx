import { Suspense } from 'react';
import PoolListTest from '@/components/PoolListTest';
import { Coins } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500 rounded-lg">
              <Coins className="text-white" size={24} />
            </div>
            Cube Uniswap V3 Explorer
          </h1>
          <p className="text-slate-400 ml-1">
            Monitoramento de liquidez e volume em tempo real via The Graph.
          </p>
        </header>

        <section>
          <Suspense fallback={<LoadingState />}>
            <PoolListTest />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

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
