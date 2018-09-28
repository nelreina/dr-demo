import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import BootstrapField from '../../components/BootstrapField';
import { connect } from 'react-redux';
import gllogo from '../../assets/greenlight_logo_loginpage.png';
import bgLoginForm from '../../assets/blurredBG.png';
import logoBank from '../../assets/logo-banco-di-caribe.png';
import Languages from '../../components/Languages';

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
    <div id="loginform">
    <Languages langs={['en', 'es']} />
    <div style={{clear:'both'}}></div>
    <div style={{
      display: 'block',
      width: '100%'
    }}>
    <div className="containerLogin" style = {{ backgroundImage: 'url(' + bgLoginForm + ')' }}>
      <img
        src={gllogo}
        alt=""
        className="logoLogin"
      />
        <form
          style={{
            width: 350,
            margin: '0 auto'
          }}
          className=""
          onSubmit={handleSubmit(action)}
        >
          {message && <p className="alert alert-danger">{t(message)}</p>}
          <Field name="username" label="Username" component={BootstrapField} />
          <Field
            name="password"
            label="Password"
            component={BootstrapField}
            type="password"
          />
          <button className="btn btn-success float-right">{t('Login')}</button>
          <div style={{clear:'both'}}></div>
        </form>
      </div>
      <div className="clientLogoContainer">
      <img
        src={logoBank}
        alt=""
        className="logoClient"
      />
      </div>
    </div>
    </div>
  );
};

LoginForm = reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);

export default translate()(LoginForm);
