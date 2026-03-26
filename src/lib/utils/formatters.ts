export function formatGDP(billions: number): string {
  if (billions >= 1000) {
    return `$${(billions / 1000).toFixed(1)}T`;
  }
  return `$${billions.toFixed(0)}B`;
}

export function formatPopulation(millions: number): string {
  if (millions >= 1000) {
    return `${(millions / 1000).toFixed(2)}B`;
  }
  return `${millions.toFixed(1)}M`;
}

export function formatMilitary(thousands: number): string {
  if (thousands >= 1000) {
    return `${(thousands / 1000).toFixed(2)}M`;
  }
  return `${thousands.toFixed(0)}K`;
}

export function formatBudget(billions: number): string {
  return `$${billions.toFixed(1)}B`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatScore(value: number): string {
  return value.toFixed(3);
}

export function formatCO2(millionTonnes: number): string {
  if (millionTonnes >= 1000) {
    return `${(millionTonnes / 1000).toFixed(1)}Gt`;
  }
  return `${millionTonnes.toFixed(0)}Mt`;
}

export function formatNuclear(count: number): string {
  if (count === 0) return "None";
  return count.toLocaleString();
}

export function formatMetricValue(key: string, value: number): string {
  switch (key) {
    case 'gdpNominal':
    case 'gdpPPP':
      return formatGDP(value);
    case 'gdpPerCapita':
      return `$${value.toLocaleString()}`;
    case 'population':
      return formatPopulation(value);
    case 'militaryBudget':
      return formatBudget(value);
    case 'militaryPersonnel':
      return formatMilitary(value);
    case 'nuclearWeapons':
      return formatNuclear(value);
    case 'hdi':
      return formatScore(value);
    case 'corruptionIndex':
    case 'globalPeaceIndex':
      return value.toFixed(1);
    case 'lifeExpectancy':
      return `${value.toFixed(1)} yrs`;
    case 'internetPenetration':
    case 'tradeGdpPercent':
      return formatPercent(value);
    case 'co2Emissions':
      return formatCO2(value);
    default:
      return value.toString();
  }
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
