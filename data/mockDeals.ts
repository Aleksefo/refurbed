export interface Deal {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  refurbed_score: number;
}

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro 128GB',
    price: 749.99,
    originalPrice: 1149.99,
    discount: 35,
    refurbed_score: 92,
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 256GB',
    price: 599.99,
    originalPrice: 899.99,
    discount: 33,
    refurbed_score: 88,
  },
  {
    id: '3',
    title: 'MacBook Air M1 256GB',
    price: 849.99,
    originalPrice: 1199.99,
    discount: 29,
    refurbed_score: 95,
  },
  {
    id: '4',
    title: 'iPhone 12 64GB',
    price: 499.99,
    originalPrice: 799.99,
    discount: 38,
    refurbed_score: 85,
  },
  {
    id: '5',
    title: 'iPad Pro 11" 128GB',
    price: 649.99,
    originalPrice: 899.99,
    discount: 28,
    refurbed_score: 90,
  },
  {
    id: '6',
    title: 'Samsung Galaxy Tab S8',
    price: 449.99,
    originalPrice: 699.99,
    discount: 36,
    refurbed_score: 87,
  },
  {
    id: '7',
    title: 'iPhone 14 128GB',
    price: 699.99,
    originalPrice: 999.99,
    discount: 30,
    refurbed_score: 94,
  },
  {
    id: '8',
    title: 'MacBook Pro 13" M2 512GB',
    price: 1299.99,
    originalPrice: 1699.99,
    discount: 24,
    refurbed_score: 96,
  },
  {
    id: '9',
    title: 'Google Pixel 7 Pro 256GB',
    price: 549.99,
    originalPrice: 899.99,
    discount: 39,
    refurbed_score: 89,
  },
  {
    id: '10',
    title: 'iPhone SE (2022) 128GB',
    price: 349.99,
    originalPrice: 529.99,
    discount: 34,
    refurbed_score: 82,
  },
];
