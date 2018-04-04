import React from 'react';
import getInputClass from './get-input-class';

const FieldSelect = ({ options, input, meta, label }) => {
  return (
    <select className={getInputClass(meta)} {...input}>
      <option value="">Choose a {label}</option>
      {options.map((option, key) => <option key={key}>{option}</option>)}
    </select>
  );
};

export default FieldSelect;
