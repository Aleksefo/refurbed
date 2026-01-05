import { Deal } from '@/data/mockDeals';

export type SortOption = 'price' | 'score';

export function filterAndSortDeals(
  deals: Deal[],
  sortBy: SortOption,
  minScore: number
): Deal[] {
  let filteredDeals = [...deals];

  if (minScore > 0) {
    filteredDeals = filteredDeals.filter((deal) => deal.refurbed_score >= minScore);
  }

  filteredDeals.sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else {
      return b.refurbed_score - a.refurbed_score;
    }
  });

  return filteredDeals;
}
