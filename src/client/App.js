import React, { Component } from 'react';
import { assign } from 'lodash';
import * as periodsActions from './store/reducers/periods';
import * as reportsActions from './store/reducers/reports';
import { authActions } from 'nelreina-web-utils';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  async componentWillMount() {
    const activePeriod = await this.props.fetchPeriods();
    this.props.fetchReports(activePeriod.id);
  }
  changeLang = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  render() {
    const { t, logout } = this.props;
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            <aside className="sidebar">Logo</aside>
            <div className="container">
              <TopBar {...this.props} />
              <hr />
              <TransitionGroup>
                <CSSTransition
                  timeout={300}
                  classNames="fade"
                  key={location.key}
                >
                  <Switch location={location}>
                    <Redirect exact from="/" to="/dashboard" />
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute
                      path="/dashboard"
                      exact
                      component={Dashboard}
                    />
                    <PrivateRoute path="/reports/:id" component={NCOA} />
                    <PrivateRoute
                      path="/translations"
                      exact
                      component={Translations}
                    />
                    <PrivateRoute component={NotFound} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        )}
      />
    );
  }
}
const actions = assign({}, periodsActions, reportsActions, authActions);
const AppConnect = connect(state => state, actions)(App);
const AppTranslate = translate()(AppConnect);
const AppWithRouter = withRouter(AppTranslate);
export default AppWithRouter;
