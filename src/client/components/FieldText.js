import React from 'react';
import getInputClass from './get-input-class';
import { translate } from 'react-i18next';

const FieldText = ({ meta, label, input, type, t }) => {
  return (
    <input
      className={getInputClass(meta)}
      placeholder={`${t(label)}`}
      type={type}
      {...input}
    />
  );
};

export default translate()(FieldText);
