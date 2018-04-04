import React, { Component } from 'react';
import { assign } from 'lodash';
import * as periodsActions from './store/reducers/periods';
import * as reportsActions from './store/reducers/reports';
import { authActions } from 'nelreina-web-utils';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Dashboard from './views/Dashboard';
import ReportList from './views/Reports';
import Report from './views/Report';
import Login from './views/Login';

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
    const { t, auth: { isAuthenticated, user }, logout } = this.props;
    return (
      <div className="container">
        <div className="btn-group">
          <button
            onClick={() => this.changeLang('en')}
            className="btn btn-primary"
          >
            EN
          </button>
          <button
            onClick={() => this.changeLang('es')}
            className="btn btn-secondary"
          >
            ES
          </button>
        </div>
        <hr />
        <Switch>
          <Redirect exact from="/" to="/reports" />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/reports" exact component={ReportList} />
          <PrivateRoute path="/reports/:id" exact component={Report} />
          <Route
            render={props => <h3>Path {props.location.pathname} not found</h3>}
          />
        </Switch>
        {isAuthenticated ? (
          <div className="user-info">
            Login as {user.username} <br />
            <button onClick={logout} className="btn btn-danger">
              LOGOUT
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
const actions = assign({}, periodsActions, reportsActions, authActions);
const AppConnect = connect(state => state, actions)(App);
const AppTranslate = translate()(AppConnect);
const AppWithRouter = withRouter(AppTranslate);
export default AppWithRouter;
