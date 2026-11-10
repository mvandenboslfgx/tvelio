export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  category: 'digital' | 'physical';
  priceCents: number | null;
  available: boolean;
  highlights: string[];
};

export const catalog: CatalogItem[] = [
  {
    id: 'annual',
    name: 'Tvelio 12 maanden',
    description: 'Een jaar toegang volgens de voorwaarden van jouw abonnement.',
    category: 'digital',
    priceCents: 10000,
    available: true,
    highlights: ['12 maanden', 'Hulp bij installatie', 'Klantenservice'],
  },
  {
    id: 'combi',
    name: 'Tvelio Combi',
    description: 'Combinatiepakket met de bijbehorende abonnementsvoorwaarden.',
    category: 'digital',
    priceCents: 17000,
    available: true,
    highlights: ['Combinatiepakket', 'Installatiehulp', 'Klantenservice'],
  },
  {
    id: 'streaming-device',
    name: 'Streamingapparaten',
    description: 'Geschikte hardware en accessoires. Assortiment en prijzen worden nog bevestigd.',
    category: 'physical',
    priceCents: null,
    available: false,
    highlights: ['Hardware', 'Accessoires', 'Binnenkort'],
  },
];

export const formatEuro = (cents: number) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(cents / 100);
