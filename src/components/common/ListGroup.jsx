import React from 'react';

const ListGroup = props => {
  const { items, onItemSelect, selectedItem } = props;

  if (!items) return null;
  return (
    <ul className='list-group'>
      {items.map(item => (
        <li
          key={item}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
          onClick={() => onItemSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
