// Formata dinheiro compactado: $1.1B, $168.6M, $30.0K
export const formatCompact = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};

// Formata porcentagem: 0.3%, 71.43%
export const formatPercent = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 100);
};

// Calcula APR (Estimativa baseada nas taxas de 24h)
// Fórmula: ((Volume24h * Taxa) * 365) / TVL
export const calculateAPR = (
  volume24h: number,
  feeTier: string,
  tvl: number
) => {
  if (tvl === 0) return 0;
  const feePercent = parseFloat(feeTier) / 1000000; // 3000 -> 0.003
  const fees24h = volume24h * feePercent;
  const yearlyFees = fees24h * 365;
  return (yearlyFees / tvl) * 100; // Retorna em % (ex: 5.5 para 5.5%)
};
