import React, { Component } from 'react';
import { assign } from 'lodash';
import { authActions } from 'nelreina-web-utils';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { PrivateRoute } from 'nr-react-private-route';

import * as reportsActions from './store/reducers/reports';
import * as periodsActions from './store/reducers/periods';
import * as bankloadActions from './store/reducers/bankload';

import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ScrollApp from './components/ScrollApp';
import Corrections from './views/Corrections';
import Dashboard from './views/Dashboard';
import NCOA from './views/NCOA';
import ReportList from './views/NCOA/ReportList';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Translations from './views/Translations';
import User from './views/User';


import './App.css';
import './NewStyle.css';

const styleAuth = {
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  background: '#e4e5e6'
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
      auth: { isAuthenticated },
      auth
    } = this.props;
    return (
      <Route
        render={({ location }) => (
          <div className="App" style={styleAuth}>
            {isAuthenticated && <Sidebar {...this.props} />}
            <div className="wrapperContainer">
              {isAuthenticated && <TopBar {...this.props} />}
              <div className="container">
              <TransitionGroup>
                <CSSTransition
                  timeout={300}
                  classNames="fade"
                  key={location.key}
                >
                  <Switch location={location}>
                    {/* <Redirect exact from="/" to="/dashboard" /> */}
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute
                      auth={auth}
                      path="/"
                      exact
                      component={Dashboard}
                    />
                    <PrivateRoute
                      auth={auth}
                      path="/corrections"
                      exact
                      component={Corrections}
                    />
                    <PrivateRoute
                      auth={auth}
                      path="/user"
                      exact
                      component={User}
                    />
                    <PrivateRoute
                      auth={auth}
                      path="/reports/:id"
                      component={NCOA}
                    />
                    <PrivateRoute
                      auth={auth}
                      path="/reportlist"
                      component={ReportList}
                    />
                    <PrivateRoute
                      auth={auth}
                      path="/translations"
                      exact
                      component={Translations}
                    />
                    <PrivateRoute auth={auth} component={NotFound} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              {isAuthenticated && <ScrollApp/>}
              </div>
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
