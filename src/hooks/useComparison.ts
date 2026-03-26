'use client';

import { useState, useMemo } from 'react';
import type { CountryData } from '@/types/country';
import { calculateCountryScore, getWinner } from '@/lib/utils/calculations';

export function useComparison() {
  const [countryA, setCountryA] = useState<CountryData | null>(null);
  const [countryB, setCountryB] = useState<CountryData | null>(null);

  const comparison = useMemo(() => {
    if (!countryA || !countryB) return null;

    const scoreA = calculateCountryScore(countryA);
    const scoreB = calculateCountryScore(countryB);
    const winner = getWinner(scoreA, scoreB);

    return {
      countryA,
      countryB,
      scoreA,
      scoreB,
      winner,
    };
  }, [countryA, countryB]);

  const slug = useMemo(() => {
    if (!countryA || !countryB) return null;
    return `${countryA.id}-vs-${countryB.id}`;
  }, [countryA, countryB]);

  return {
    countryA,
    countryB,
    setCountryA,
    setCountryB,
    comparison,
    slug,
    reset: () => {
      setCountryA(null);
      setCountryB(null);
    },
  };
}
