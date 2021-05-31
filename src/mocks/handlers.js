import { rest } from 'msw';

console.log('handlers file');

export const handlers = [
  rest.get('http://localhost:5000/expenses', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          item: 'Karachi Fruit Biscuit 400G',
          category: 'Grocery',
          subCategory: 'Snacks',
          count: '1',
          price: 3.99,
          purchaseDate: '2020-11-26T00:00:00.000Z',
          shop: 'South Shore Desi Market'
        },
        {
          item: 'Milk Bikis',
          category: 'Grocery',
          subCategory: 'Snacks',
          count: '1',
          price: 0.99,
          purchaseDate: '2020-06-04T00:00:00.000Z',
          shop: 'South Shore Desi Market'
        }
      ])
    );
  })
];
