import * as React from 'react';

interface inputProps {
  name: string;
  label: string;
  value: string;
  type?: string;
  error?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<inputProps> = ({
  name,
  label,
  type,
  value,
  error,
  onChange,
  placeholder
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        id={name}
        name={name}
        type={type ? type : 'text'}
        placeholder={placeholder}
        className='form-control'
        onChange={onChange}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
