import React, { Component } from 'react';
import { assign } from 'lodash';
import * as periodsActions from './store/reducers/periods';
import * as reportsActions from './store/reducers/reports';
import { authActions } from 'nelreina-web-utils';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import TopBar from './components/TopBar';
import Dashboard from './views/Dashboard';
import NCOA from './views/NCOA';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Translations from './views/Translations';

import './App.css';
class App extends Component {
  componentWillMount() {
    this.props.fetchPeriods();
    this.props.fetchReports();
  }
  changeLang = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  render() {
    const { t, logout } = this.props;
    return (
      <div className="container">
        <TopBar {...this.props} />
        <hr />
        <Switch>
          <Redirect exact from="/" to="/reports" />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/reports" exact component={Dashboard} />
          <PrivateRoute path="/reports/:id" component={NCOA} />
          <PrivateRoute path="/translations" exact component={Translations} />
          <PrivateRoute component={NotFound} />
        </Switch>
      </div>
    );
  }
}
const actions = assign({}, periodsActions, reportsActions, authActions);
const AppConnect = connect(state => state, actions)(App);
const AppTranslate = translate()(AppConnect);
const AppWithRouter = withRouter(AppTranslate);
export default AppWithRouter;
