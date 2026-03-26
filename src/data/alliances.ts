import type { AllianceData } from '@/types/tools';

export const ALLIANCES: AllianceData[] = [
  {
    name: 'North Atlantic Treaty Organization',
    shortName: 'NATO',
    type: 'Military',
    members: [
      'United States', 'United Kingdom', 'France', 'Germany', 'Italy', 'Spain',
      'Canada', 'Turkey', 'Poland', 'Netherlands', 'Portugal', 'Greece',
      'Sweden', 'Norway', 'Belgium', 'Denmark', 'Czech Republic', 'Romania',
      'Hungary', 'Bulgaria', 'Slovakia', 'Albania', 'Montenegro', 'North Macedonia',
      'Croatia', 'Slovenia', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg',
      'Finland', 'Iceland',
    ],
    founded: 1949,
    description:
      'The most powerful military alliance in history, bringing together 32 countries under a collective defense pact. An attack on one member is treated as an attack on all.',
  },
  {
    name: 'Brazil, Russia, India, China, South Africa',
    shortName: 'BRICS',
    type: 'Economic',
    members: [
      'Brazil', 'Russia', 'India', 'China', 'South Africa',
      'Iran', 'Saudi Arabia', 'UAE', 'Egypt', 'Ethiopia',
    ],
    founded: 2009,
    description:
      'An economic bloc representing the world\'s leading emerging economies. Expanded in 2024 to include five new members as a counterweight to G7 dominance.',
  },
  {
    name: 'Group of 7',
    shortName: 'G7',
    type: 'Political',
    members: [
      'United States', 'United Kingdom', 'France', 'Germany',
      'Japan', 'Italy', 'Canada',
    ],
    founded: 1975,
    description:
      'An informal bloc of the world\'s seven largest advanced economies, accounting for about 40% of global GDP. Coordinates on economic and foreign policy.',
  },
  {
    name: 'Group of 20',
    shortName: 'G20',
    type: 'Economic',
    members: [
      'United States', 'China', 'Japan', 'Germany', 'India', 'United Kingdom',
      'France', 'Italy', 'Canada', 'South Korea', 'Russia', 'Australia',
      'Brazil', 'Mexico', 'South Africa', 'Saudi Arabia', 'Turkey', 'Indonesia',
      'Argentina', 'European Union',
    ],
    founded: 1999,
    description:
      'The premier forum for international economic cooperation, representing 85% of global GDP and two-thirds of the world\'s population.',
  },
  {
    name: 'Shanghai Cooperation Organisation',
    shortName: 'SCO',
    type: 'Political',
    members: [
      'China', 'Russia', 'India', 'Pakistan', 'Kazakhstan', 'Iran',
      'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Belarus',
    ],
    founded: 2001,
    description:
      'A Eurasian political, economic, and security organization often seen as a counterbalance to Western alliances. Covers 40% of humanity.',
  },
  {
    name: 'Association of Southeast Asian Nations',
    shortName: 'ASEAN',
    type: 'Regional',
    members: [
      'Indonesia', 'Malaysia', 'Thailand', 'Philippines', 'Vietnam',
      'Singapore', 'Myanmar', 'Cambodia', 'Laos', 'Brunei',
    ],
    founded: 1967,
    description:
      'Southeast Asia\'s primary regional forum for economic integration, political cooperation, and security dialogue.',
  },
];
