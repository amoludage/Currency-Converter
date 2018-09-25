import React from 'react';

const Select = props => {
  return (
        <select
          className='form-control'
          value={props.value}
          required
          onChange={
            e => { props.handleOnChange(e.target.value) }
          }
        >
        {
        props.options.map((option, index) => {
          return (<option value={option} key={index}>{option}</option>)
        })
        }
        </select>
    )
};


export default Select;
