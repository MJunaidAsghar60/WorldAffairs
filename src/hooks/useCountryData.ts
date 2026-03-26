'use client';

import { useState, useCallback } from 'react';
import { COUNTRIES, getCountryById } from '@/data/countries';
import type { CountryData } from '@/types/country';

export function useCountryData() {
  const [search, setSearch] = useState('');

  const filtered = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.region.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRIES;

  const getById = useCallback((id: string) => getCountryById(id), []);

  return {
    countries: filtered,
    allCountries: COUNTRIES,
    search,
    setSearch,
    getById,
  };
}
