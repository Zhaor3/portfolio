export type Vehicle = {
  id: string;
  name: string;
  period: string;
  notes: string;
  /** Ordered image paths relative to /public/images/. First image is the hero. */
  images: string[];
  current?: boolean;
};

export const vehicles: Vehicle[] = [
  {
    id: 'miata-na',
    name: '1990 Mazda Miata 1.6 (NA)',
    period: 'Current build',
    notes: 'Coilovers, suspension work, staged upgrades. Project car.',
    images: ['miata-na/hero.jpg'],
    current: true,
  },
  {
    id: 'mx5-1993',
    name: '1993 Mazda MX-5 Restoration',
    period: '2023 – current',
    notes:
      'Full overhaul: disassembly, cleaning, chassis repair, preparing for new paint.',
    images: [
      'mx5-1993/flatbed-arrival.jpg',
      'mx5-1993/welding.jpg',
    ],
  },
  {
    id: 's500-w140',
    name: '1995 Mercedes-Benz S500 (W140)',
    period: '2023',
    notes: 'Restoration focused on mechanical repairs and aesthetic improvements.',
    images: [
      's500-w140/garage.jpg',
      's500-w140/driveway-front.jpg',
      's500-w140/grille-swap.jpg',
    ],
  },
  {
    id: 'civic-type-r',
    name: '2017 Honda Civic Type R',
    period: '2022 – 2024',
    notes: 'Performance and aesthetic modifications.',
    images: [
      'civic-type-r/hero.jpg',
      'civic-type-r/driveway-wide.jpg',
    ],
  },
  {
    id: 'brz',
    name: '2013 Subaru BRZ Limited',
    period: '2020 – 2023',
    notes: 'Performance and handling upgrades.',
    images: [
      'brz/night-garage.jpg',
      'brz/engine-bay.jpg',
    ],
  },
];
