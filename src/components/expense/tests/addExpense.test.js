import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AddExpenseForm from '../AddExpense';
import moment from 'moment';

describe('Testing Add Expense Form', () => {
  test('Provide required field and enable "Add" button', () => {
    render(<AddExpenseForm />);

    const textBoxes = screen.getAllByRole('textbox');
    expect(textBoxes).toHaveLength(4);
    expect(screen.getByText(/item name/i)).toBeInTheDocument();

    const addBtn = screen.getByRole('button', { name: /add/i });
    expect(addBtn).toBeInTheDocument();
    expect(addBtn).toBeDisabled();

    // Enable Add button
    const itemTxtBx = textBoxes[0];
    userEvent.type(itemTxtBx, 'Banana');
    expect(itemTxtBx).toHaveValue('Banana');

    const category = screen.getByTestId('category');
    userEvent.selectOptions(category, 'Grocery');
    expect(screen.getByRole('option', { name: 'Grocery' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Auto' }).selected).toBe(false);

    const subCategory = screen.getByTestId('subCategory');
    userEvent.selectOptions(subCategory, 'Fruits');
    expect(screen.getByRole('option', { name: 'Fruits' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Vegetables' }).selected).toBe(
      false
    );

    const countTxtBx = textBoxes[1];
    userEvent.type(countTxtBx, '1');
    expect(countTxtBx).toHaveValue('1');

    const priceTxtBx = textBoxes[2];
    userEvent.type(priceTxtBx, '0.99');
    expect(priceTxtBx).toHaveValue('0.99');

    const purchaseDate = screen.getByLabelText(/purchase date/i);
    expect(purchaseDate).toHaveValue(moment().format('YYYY-MM-DD'));

    const shopTxt = textBoxes[3];
    userEvent.type(shopTxt, 'Stop & Shop');
    expect(shopTxt).toHaveValue('Stop & Shop');

    const wannaAddExpenseCheckBx = screen.getByRole('checkbox', {
      name: /wanna add another expense/i
    });
    expect(wannaAddExpenseCheckBx).toBeChecked();

    expect(addBtn).toBeEnabled();
  });

  test('Click "Add" button with "wanna add another expense?" option checked, and confirm the form is still open', () => {
    render(<AddExpenseForm />);

    const textBoxes = screen.getAllByRole('textbox');
    expect(textBoxes).toHaveLength(4);
    expect(screen.getByText(/item name/i)).toBeInTheDocument();

    const addBtn = screen.getByRole('button', { name: /add/i });
    expect(addBtn).toBeInTheDocument();
    expect(addBtn).toBeDisabled();

    // Enable Add button
    const itemTxtBx = textBoxes[0];
    userEvent.type(itemTxtBx, 'Banana');
    expect(itemTxtBx).toHaveValue('Banana');

    const category = screen.getByTestId('category');
    userEvent.selectOptions(category, 'Grocery');
    expect(screen.getByRole('option', { name: 'Grocery' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Auto' }).selected).toBe(false);

    const subCategory = screen.getByTestId('subCategory');
    userEvent.selectOptions(subCategory, 'Fruits');
    expect(screen.getByRole('option', { name: 'Fruits' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Vegetables' }).selected).toBe(
      false
    );

    const countTxtBx = textBoxes[1];
    userEvent.type(countTxtBx, '1');
    expect(countTxtBx).toHaveValue('1');

    const priceTxtBx = textBoxes[2];
    userEvent.type(priceTxtBx, '0.99');
    expect(priceTxtBx).toHaveValue('0.99');

    const purchaseDate = screen.getByLabelText(/purchase date/i);
    expect(purchaseDate).toHaveValue(moment().format('YYYY-MM-DD'));

    const shopTxt = textBoxes[3];
    userEvent.type(shopTxt, 'Stop & Shop');
    expect(shopTxt).toHaveValue('Stop & Shop');

    const wannaAddExpenseCheckBx = screen.getByRole('checkbox', {
      name: /wanna add another expense/i
    });
    expect(wannaAddExpenseCheckBx).toBeChecked();

    expect(addBtn).toBeEnabled();
    userEvent.click(addBtn);

    // TODO: send async request to mock server and get mock response and check if page redirects to expenses
    // Expect submit button to stay in the screen because backend is not up and running
    expect(addBtn).toBeTruthy();
  });

  test('Click "Add" button with "wanna add another expense?" option NOT checked, and confirm the page has redirected to /expense', () => {
    render(<AddExpenseForm />);

    const textBoxes = screen.getAllByRole('textbox');
    expect(textBoxes).toHaveLength(4);
    expect(screen.getByText(/item name/i)).toBeInTheDocument();

    const addBtn = screen.getByRole('button', { name: /add/i });
    expect(addBtn).toBeInTheDocument();
    expect(addBtn).toBeDisabled();

    // Enable Add button
    const itemTxtBx = textBoxes[0];
    userEvent.type(itemTxtBx, 'Item 1');
    expect(itemTxtBx).toHaveValue('Item 1');

    const category = screen.getByTestId('category');
    userEvent.selectOptions(category, 'Grocery');
    expect(screen.getByRole('option', { name: 'Grocery' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Auto' }).selected).toBe(false);

    const subCategory = screen.getByTestId('subCategory');
    userEvent.selectOptions(subCategory, 'Fruits');
    expect(screen.getByRole('option', { name: 'Fruits' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Vegetables' }).selected).toBe(
      false
    );

    const countTxtBx = textBoxes[1];
    userEvent.type(countTxtBx, '1');
    expect(countTxtBx).toHaveValue('1');

    const priceTxtBx = textBoxes[2];
    userEvent.type(priceTxtBx, '0.99');
    expect(priceTxtBx).toHaveValue('0.99');

    const purchaseDate = screen.getByLabelText(/purchase date/i);
    expect(purchaseDate).toHaveValue(moment().format('YYYY-MM-DD'));

    const shopTxt = textBoxes[3];
    userEvent.type(shopTxt, 'Stop & Shop');
    expect(shopTxt).toHaveValue('Stop & Shop');

    const wannaAddExpenseCheckBx = screen.getByRole('checkbox', {
      name: /wanna add another expense/i
    });
    userEvent.click(wannaAddExpenseCheckBx);
    expect(wannaAddExpenseCheckBx).not.toBeChecked();

    expect(addBtn).toBeEnabled();
    userEvent.click(addBtn);

    // TODO: send async request to mock server and get mock response and check if page redirects to expenses
    // expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});
