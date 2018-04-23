import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authActions as actions } from 'nelreina-web-utils';
import { Login } from 'nr-react-private-route';

import LoginForm from './LoginForm';

// import * as actions from '../store/reducers/auth';

class LoginView extends Component {
  render() {
    const { login, t, auth } = this.props;
    return (
      <Login auth={auth} {...this.props}>
        <LoginForm action={login} message={auth.message} />
      </Login>
    );
  }
}
const TranslateLogin = translate()(LoginView);
const ConnectLogin = connect(state => ({ auth: state.auth }), actions)(
  TranslateLogin
);

export default ConnectLogin;
