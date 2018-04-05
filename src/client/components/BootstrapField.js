import React from 'react';
import FieldText from './FieldText';
import FieldSelect from './FieldSelect';
import { translate } from 'react-i18next';

const getInputType = (type, props) => {
  switch (type) {
    case 'select':
      return <FieldSelect {...props} />;
    default:
      return <FieldText type={type} {...props} />;
  }
};

const BootstrapField = props => {
  const { type, meta, label, t } = props;
  return (
    <div className="form-group">
      <label>{t(label)}</label>
      {getInputType(type, props)}
      <div className="invalid-feedback">{t(meta.error)}</div>
    </div>
  );
};

export default translate()(BootstrapField);
