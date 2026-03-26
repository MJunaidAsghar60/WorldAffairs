import type { CountryData } from '@/types/country';

const WEIGHTS: Record<string, number> = {
  gdpNominal: 0.15,
  gdpPerCapita: 0.1,
  militaryBudget: 0.1,
  militaryPersonnel: 0.05,
  hdi: 0.15,
  corruptionIndex: 0.1,
  lifeExpectancy: 0.1,
  internetPenetration: 0.05,
  co2Emissions: 0.05,
  nuclearWeapons: 0.05,
  globalPeaceIndex: 0.05,
  population: 0.05,
};

const MAXIMA: Record<string, number> = {
  gdpNominal: 27000,
  gdpPerCapita: 100000,
  militaryBudget: 900,
  militaryPersonnel: 3000,
  hdi: 1,
  corruptionIndex: 100,
  lifeExpectancy: 90,
  internetPenetration: 100,
  co2Emissions: 12000,
  nuclearWeapons: 6000,
  globalPeaceIndex: 4,
  population: 1450,
};

// Higher is better for these metrics
const HIGHER_IS_BETTER: Record<string, boolean> = {
  gdpNominal: true,
  gdpPerCapita: true,
  militaryBudget: true,
  militaryPersonnel: true,
  hdi: true,
  corruptionIndex: true,
  lifeExpectancy: true,
  internetPenetration: true,
  co2Emissions: false,
  nuclearWeapons: true,
  globalPeaceIndex: false,
  population: true,
};

export function calculateCountryScore(country: CountryData): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const [metric, weight] of Object.entries(WEIGHTS)) {
    const value = country[metric as keyof CountryData] as number;
    const max = MAXIMA[metric] || 100;
    const normalized = Math.min(value / max, 1);
    const adjusted = HIGHER_IS_BETTER[metric] ? normalized : 1 - normalized;
    totalScore += adjusted * weight;
    totalWeight += weight;
  }

  // Bonus for memberships
  if (country.g7) totalScore += 0.02;
  if (country.g20) totalScore += 0.01;
  if (country.unSecurityCouncil) totalScore += 0.015;

  return Math.round((totalScore / totalWeight) * 100);
}

export function getMetricBarWidth(
  value: number,
  comparisonValue: number,
  metricKey: string
): number {
  const max = Math.max(value, comparisonValue);
  if (max === 0) return 0;
  return Math.round((value / max) * 100);
}

export function getWinner(scoreA: number, scoreB: number): 'A' | 'B' | 'tie' {
  if (Math.abs(scoreA - scoreB) < 2) return 'tie';
  return scoreA > scoreB ? 'A' : 'B';
}
