'use client';

import { useState } from 'react';

interface TokenIconProps {
  src: string;
  alt: string;
}

export default function TokenIcon({ src, alt }: TokenIconProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-900" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-6 h-6 rounded-full border border-slate-900 bg-slate-700"
      onError={() => setError(true)}
    />
  );
}
