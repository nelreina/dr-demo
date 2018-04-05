import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import BootstrapField from '../../components/BootstrapField';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (values.username && values.username.length < 3) {
    errors.username = 'Username must be greater than 3 char';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};
let LoginForm = ({ handleSubmit, action, message, t }) => {
  return (
    <form onSubmit={handleSubmit(action)}>
      <h5>{t('Please Login')}</h5>
      {message && <p className="alert alert-danger">{t(message)}</p>}
      <Field name="username" label="Username" component={BootstrapField} />
      <Field
        name="password"
        label="Password"
        component={BootstrapField}
        type="password"
      />
      <button className="btn btn-primary">{t('Login')}</button>
    </form>
  );
};

LoginForm = reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);

export default translate()(LoginForm);
