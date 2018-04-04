import React from 'react';
import getInputClass from './get-input-class';

const FieldText = ({ meta, label, input, type }) => {
  return (
    <input
      className={getInputClass(meta)}
      placeholder={`Enter ${label}`}
      type={type}
      {...input}
    />
  );
};

export default FieldText;
