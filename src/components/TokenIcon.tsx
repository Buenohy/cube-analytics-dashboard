'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAddress } from 'viem';

interface TokenIconProps {
  address: string;
  alt: string;
}

export default function TokenIcon({ address, alt }: TokenIconProps) {
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  let checksumAddress = address;
  try {
    checksumAddress = getAddress(address);
  } catch (e) {}

  const srcTrust = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checksumAddress}/logo.png`;
  const src1inch = `https://tokens.1inch.io/${address}`;

  const currentSrc = attempt === 0 ? srcTrust : src1inch;

  const handleError = () => {
    if (attempt === 0) {
      setAttempt(1);
    } else {
      setError(true);
    }
  };

  if (error) {
    return (
      <div
        className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-bold select-none"
        title={alt}
      >
        {alt.slice(0, 1)}
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={24}
      height={24}
      className="rounded-full border border-slate-900 bg-slate-800 object-cover"
      onError={handleError}
      unoptimized={true}
    />
  );
}
