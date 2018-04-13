import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authActions as actions } from 'nelreina-web-utils';
import LoginForm from './LoginForm';
// import * as actions from '../store/reducers/auth';

class Login extends Component {
  render() {
    const { login, t, auth } = this.props;
    return auth.isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <LoginForm action={login} message={auth.message} />
    );
  }
}
const TranslateLogin = translate()(Login);
const ConnectLogin = connect(state => ({ auth: state.auth }), actions)(
  TranslateLogin
);

export default ConnectLogin;
