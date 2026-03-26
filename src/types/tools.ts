export interface ToolCard {
  id: string;
  name: string;
  emoji: string;
  category: 'Compare' | 'Track' | 'Risk' | 'Analyze' | 'Travel' | 'Simulate';
  description: string;
  href: string;
  color: string;
  bgColor: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
}

export interface SanctionEntry {
  country: string;
  flag: string;
  imposedBy: string[];
  reason: string;
  since: string;
  type: string[];
  severity: 'High' | 'Medium' | 'Low';
}

export interface PassportData {
  country: string;
  flag: string;
  rank: number;
  visaFreeCount: number;
  visaOnArrival: number;
  eVisa: number;
  visaRequired: number;
  score: number;
}

export interface RiskScore {
  country: string;
  flag: string;
  overall: number;
  conflictRisk: number;
  politicalStability: number;
  economicRisk: number;
  travelAdvisory: 'Safe' | 'Exercise Caution' | 'Avoid Non-Essential' | 'Do Not Travel';
  label: string;
}

export interface AllianceData {
  name: string;
  shortName: string;
  type: 'Military' | 'Economic' | 'Political' | 'Regional';
  members: string[];
  founded: number;
  description: string;
}
