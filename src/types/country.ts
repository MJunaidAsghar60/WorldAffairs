export interface CountryData {
  id: string;
  name: string;
  flag: string;
  region: string;
  gdpNominal: number;
  gdpPPP: number;
  gdpPerCapita: number;
  population: number;
  militaryBudget: number;
  militaryPersonnel: number;
  nuclearWeapons: number;
  hdi: number;
  corruptionIndex: number;
  globalPeaceIndex: number;
  lifeExpectancy: number;
  internetPenetration: number;
  co2Emissions: number;
  tradeGdpPercent: number;
  unSecurityCouncil: boolean;
  nato: boolean;
  brics: boolean;
  g20: boolean;
  g7: boolean;
}

export type MetricKey = keyof Omit<CountryData, 'id' | 'name' | 'flag' | 'region' | 'unSecurityCouncil' | 'nato' | 'brics' | 'g20' | 'g7'>;

export interface MetricConfig {
  key: MetricKey;
  label: string;
  tooltip: string;
  unit: string;
  format: 'number' | 'currency' | 'percent' | 'decimal' | 'score';
  higherIsBetter: boolean;
  tab: 'economy' | 'military' | 'society' | 'global';
}

export interface ComparisonResult {
  countryA: CountryData;
  countryB: CountryData;
  scoreA: number;
  scoreB: number;
  winner: 'A' | 'B' | 'tie';
}
