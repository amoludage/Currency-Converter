import React from 'react';

const Input = props => {
  return (
        <input
          className='form-control'
          type={ props.inputType }
          value={props.value}
          required
          onChange={
            e => { props.handleOnChange(e.target.value) }
          }
        />
    )
};

export default Input;
