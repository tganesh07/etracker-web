import React from 'react';

const TableHeader = props => {
  const { columns, sortColumn, onSort } = props;

  const raiseSort = column => {
    let sortedColumn = { ...sortColumn };
    if (sortedColumn.column === column)
      sortedColumn.order = sortedColumn.order !== 'asc' ? 'asc' : 'desc';
    else {
      sortedColumn.column = column;
      sortedColumn.order = 'asc';
    }
    onSort(sortedColumn);
  };

  const renderSortIcon = column => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc' />;

    return <i className='fa fa-sort-desc' />;
  };

  return (
    <thead className='thead-dark'>
      <tr>
        {columns.map(column => (
          <th
            className='clickable'
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
