import React from 'react';
import TableHeader from '../common/TableHeader';
import TableBody from '../common/TableBody';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseTable = props => {
  const { data, onSort, sortColumn, onDelete } = props;
  const columns = [
    {
      label: 'Item',
      path: 'item',
      content: expense => (
        <Link to={`expense/${expense._id}`}>{expense.item}</Link>
      )
    },
    { label: 'Category', path: 'category' },
    { label: 'Sub Category', path: 'subCategory' },
    { label: 'Total Amt', path: 'price' },
    {
      label: 'Purchase Date',
      content: expense => moment(expense.purchaseDate).format('ll')
    },
    { label: 'Shop', path: 'shop' },
    {
      key: 'delete',
      content: expense => (
        <button
          className='btn btn-danger btn-sm'
          onClick={() => onDelete(expense)}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <table className='table table-striped table-hover table-sm table-responsive'>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default ExpenseTable;
