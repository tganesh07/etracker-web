import React, { useState } from 'react';
import Joi from 'joi-browser';
import Input from '../../shared/components/Input';

const Login = () => {
  const [inputs, setInputs] = useState({
    userName: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const loginSchema = {
    userName: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  const handleSubmit = event => {
    event.preventDefault();
    const errors = validate();

    if (errors) {
      setErrors(errors || {});
      return;
    }
    // API call
    console.log('Submitted');
  };

  function validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(inputs, loginSchema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value }; // Dynamic object creation with one field which user is modifying
    const schema = { [name]: loginSchema[name] }; // Dynamic schema creation.
    const { error } = Joi.validate(obj, schema); // validate one property at a time and not the whole form
    return error ? error.details[0].message : null;
  }

  const handleInputChange = event => {
    event.persist();

    const errorObj = { ...errors };
    const errorMessage = validateProperty(event.target);

    if (errorMessage) errorObj[event.target.name] = errorMessage;
    else delete errorObj[event.target.name];

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));

    setErrors({
      ...errorObj
    });
  };

  return (
    <React.Fragment>
      <form className='container' onSubmit={handleSubmit}>
        <Input
          name='userName'
          label='Username'
          value={inputs.userName}
          error={errors.userName}
          onChange={handleInputChange}
        />
        <Input
          name='password'
          type='password'
          label='Password'
          value={inputs.password}
          error={errors.password}
          onChange={handleInputChange}
        />
        <button className='btn-primary' disabled={validate()}>
          Register
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
