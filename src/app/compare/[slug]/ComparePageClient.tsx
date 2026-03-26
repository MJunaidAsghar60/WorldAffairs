'use client';

import CountryComparatorClient from '@/app/tools/country-comparator/CountryComparatorClient';

interface ComparePageClientProps {
  initialCountryAId: string;
  initialCountryBId: string;
}

export default function ComparePageClient({
  initialCountryAId,
  initialCountryBId,
}: ComparePageClientProps) {
  return (
    <CountryComparatorClient
      initialCountryAId={initialCountryAId}
      initialCountryBId={initialCountryBId}
    />
  );
}
