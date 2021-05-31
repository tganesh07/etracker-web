import React from 'react';

const UpdateExpenseForm = ({ match, history }) => {
  return (
    <div>
      <h1>Update Expense {match.params.id}</h1>
      <button className='btn-primary' onClick={() => history.push('/expense')}>
        Back to expenses
      </button>
    </div>
  );
};

export default UpdateExpenseForm;
