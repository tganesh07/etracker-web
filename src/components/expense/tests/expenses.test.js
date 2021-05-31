import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Expenses from '../Expenses';

describe('Testing Expense Page', () => {
  test('Initial State', () => {
    render(<Expenses />);

    expect(screen.getByText('Showing 0 expenses')).toBeInTheDocument();
  });

  test('Check rendered list of expenses', async () => {
    render(<Expenses />);

    // expect(await screen.findAllByRole('row')).toHaveLength(2);
    expect(
      await screen.findByText('Karachi Fruit Biscuit 400G')
    ).toBeInTheDocument();
  });
});
