import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import Input from '../../shared/components/Input';

const AddExpenseForm = ({ history }) => {
  const [inputs, setInputs] = useState({
    itemname: '',
    category: '',
    subCategory: '',
    count: '',
    price: '',
    purchaseDate: moment().format('YYYY-MM-DD'),
    shop: ''
  });
  const [checked, setChecked] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    validateInputs();
  }, [inputs]);

  function validateInputs() {
    if (
      inputs.itemname &&
      inputs.category &&
      inputs.subCategory &&
      inputs.count &&
      inputs.price &&
      inputs.purchaseDate &&
      inputs.shop
    )
      setDisableSubmit(false);
    else setDisableSubmit(true);
  }

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post('http://localhost:5000/expenses', {
        item: inputs.itemname,
        category: inputs.category,
        subCategory: inputs.subCategory,
        count: inputs.count,
        price: inputs.price,
        purchaseDate: moment(inputs.purchaseDate).format('YYYY-MM-DD'),
        shop: inputs.shop
      })
      .then(
        response => {
          console.log('response ', response);
          if (!checked) history.push('/expense');
        },
        error => {
          console.log('Add request failed ', error);
        }
      );
  };

  const handleInputChange = event => {
    event.persist();

    if (event.target.name === 'addAnotherExpense') setChecked(!checked);
    else {
      setInputs(inputs => ({
        ...inputs,
        [event.target.name]: event.target.value
      }));
    }
  };

  return (
    <div>
      <form className='container' onSubmit={handleSubmit}>
        <Input
          name='itemname'
          label='Item name'
          value={inputs.itemname}
          onChange={handleInputChange}
          placeholder='Enter Item/Product Name'
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <select
              className='form-control'
              id='category'
              name='category'
              onChange={handleInputChange}
              value={inputs.category}
              data-testid='category'
            >
              <option value='' selected disabled hidden>
                Choose a Category
              </option>
              <option>Grocery</option>
              <option>Restaurants</option>
              <option>Auto</option>
              <option>Travel</option>
              <option>Entertainment</option>
              <option>Personal Care</option>
            </select>
          </div>
          <div className='form-group' style={{ marginLeft: '20px' }}>
            <label htmlFor='subCategory'>Sub Category</label>
            <select
              className='form-control'
              id='subCategory'
              name='subCategory'
              onChange={handleInputChange}
              value={inputs.subCategory}
              data-testid='subCategory'
            >
              <option value='' selected disabled hidden>
                Choose a Sub Category
              </option>
              <option>Food</option>
              <option>Masala</option>
              <option>Meat</option>
              <option>Snacks</option>
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Beauty Care</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Input
            name='count'
            label='Count'
            value={inputs.count}
            onChange={handleInputChange}
          />
          <div style={{ marginLeft: '20px' }}>
            <Input
              name='price'
              label='Price'
              value={inputs.price}
              onChange={handleInputChange}
              placeholder='Enter price in USD'
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='purchaseDate'>Purchase Date</label>
          <TextField
            id='purchaseDate'
            name='purchaseDate'
            type='date'
            value={inputs.purchaseDate}
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleInputChange}
            style={{ marginLeft: 10 }}
          />
        </div>
        <Input
          name='shop'
          label='Shop'
          value={inputs.shop}
          onChange={handleInputChange}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <button className='btn btn-primary' disabled={disableSubmit}>
            Add
          </button>
          <div
            className='form-check'
            style={{ marginLeft: '15px', marginTop: '5px' }}
          >
            <input
              name='addAnotherExpense'
              className='form-check-input'
              type='checkbox'
              id='addAnotherExpense'
              checked={checked}
              onChange={handleInputChange}
            />
            <label htmlFor='addAnotherExpense' className='form-check-label'>
              wanna add another expense?
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
