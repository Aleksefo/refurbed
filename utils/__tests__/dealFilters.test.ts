import { filterAndSortDeals } from '../dealFilters';
import { Deal } from '@/data/mockDeals';

const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro',
    price: 749.99,
    originalPrice: 1149.99,
    discount: 35,
    refurbed_score: 92,
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23',
    price: 599.99,
    originalPrice: 899.99,
    discount: 33,
    refurbed_score: 88,
  },
  {
    id: '3',
    title: 'MacBook Air M1',
    price: 849.99,
    originalPrice: 1199.99,
    discount: 29,
    refurbed_score: 95,
  },
];

describe('filterAndSortDeals', () => {
  test('should sort by price ascending', () => {
    const result = filterAndSortDeals(mockDeals, 'price', 0);

    expect(result[0].id).toBe('2');
    expect(result[1].id).toBe('1');
    expect(result[2].id).toBe('3');
  });

  test('should sort by score descending', () => {
    const result = filterAndSortDeals(mockDeals, 'score', 0);

    expect(result[0].id).toBe('3');
    expect(result[1].id).toBe('1');
    expect(result[2].id).toBe('2');
  });

  test('should filter by minimum score', () => {
    const result = filterAndSortDeals(mockDeals, 'price', 90);

    expect(result.length).toBe(2);
    expect(result.find((d) => d.id === '2')).toBeUndefined();
  });

  test('should filter and sort together', () => {
    const result = filterAndSortDeals(mockDeals, 'score', 90);

    expect(result.length).toBe(2);
    expect(result[0].id).toBe('3');
    expect(result[1].id).toBe('1');
  });

  test('should not mutate original array', () => {
    const original = [...mockDeals];
    filterAndSortDeals(mockDeals, 'price', 0);

    expect(mockDeals).toEqual(original);
  });
});
