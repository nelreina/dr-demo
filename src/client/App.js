import React, { Component } from 'react';
import { assign } from 'lodash';
import { authActions } from 'nelreina-web-utils';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';

import * as reportsActions from './store/reducers/reports';
import * as periodsActions from './store/reducers/periods';
import * as bankloadActions from './store/reducers/bankload';

import PrivateRoute from './PrivateRoute';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Corrections from './views/Corrections';
import Dashboard from './views/Dashboard';
import NCOA from './views/NCOA';
import ReportList from './views/NCOA/ReportList';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Translations from './views/Translations';
import bg from '../client/assets/Greenwave.png';

import './App.css';

const styleLogin = {
  backgroundImage: `url(${bg})`,
  backgroundSize: '100% 25%',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat'
};

const styleAuth = {
  display: 'grid',
  gridTemplateColumns: '200px 1fr'
};
class App extends Component {
  async componentWillMount() {
    const activePeriod = await this.props.fetchPeriods();
    this.props.fetchReports(activePeriod.id);
    this.props.fetchBankload(activePeriod.id);
  }
  changeLang = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  render() {
    const {
      t,
      logout,
      auth: { isAuthenticated }
    } = this.props;
    return (
      <Route
        render={({ location }) => (
          <div className="App" style={isAuthenticated ? styleAuth : styleLogin}>
            {isAuthenticated && <Sidebar {...this.props} />}
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
                    <PrivateRoute
                      path="/corrections"
                      exact
                      component={Corrections}
                    />
                    <PrivateRoute path="/reports/:id" component={NCOA} />
                    <PrivateRoute path="/reportlist" component={ReportList} />
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
const actions = assign(
  {},
  periodsActions,
  reportsActions,
  authActions,
  bankloadActions
);

const enhance = compose(
  withRouter,
  connect(state => state, actions),
  translate()
);
export default enhance(App);
// export default AppWithRouter;
