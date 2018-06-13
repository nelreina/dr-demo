import React from 'react';
import getInputClass from './get-input-class';
import { translate } from 'react-i18next';
import S from 'string';
const FieldText = ({ meta, label, input, type, t }) => {
  return (
    <input
      className={getInputClass(meta)}
      placeholder={`${t(S(input.name).capitalize().s)}`}
      type={type}
      {...input}
    />
  );
};

export default translate()(FieldText);
