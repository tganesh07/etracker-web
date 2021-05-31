import React from 'react';

const AddExpense = () => {
  console.log('Add Expense');
  return (
    <div className='modal' id='addExpenseModal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>Add New Expense</h2>
            <button type='button' className='close'>
              <span>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <p>All Input fields</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
