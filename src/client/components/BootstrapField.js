import React from 'react';
import FieldText from './FieldText';
import FieldSelect from './FieldSelect';

const getInputType = (type, props) => {
  switch (type) {
    case 'select':
      return <FieldSelect {...props} />;
    default:
      return <FieldText type={type} {...props} />;
  }
};

const BootstrapField = props => {
  const { type, meta, label } = props;
  return (
    <div className="form-group">
      <label>{label}</label>
      {getInputType(type, props)}
      <div className="invalid-feedback">{meta.error}</div>
    </div>
  );
};

export default BootstrapField;
