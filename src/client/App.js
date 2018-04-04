import React, { Component } from 'react';
import { assign } from 'lodash';
import * as periodsActions from './store/reducers/periods';
import * as reportsActions from './store/reducers/reports';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Reports from './views/Reports';
import Report from './views/Report';
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
    const { t } = this.props;
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
          <Route path="/reports" exact component={Reports} />
          <Route path="/reports/:id" exact component={Report} />
          <Route
            render={props => <h3>Path {props.location.pathname} not found</h3>}
          />
        </Switch>
      </div>
    );
  }
}
const actions = assign({}, periodsActions, reportsActions);
const AppConnect = connect(state => state, actions)(App);
const AppTranslate = translate()(AppConnect);
const AppWithRouter = withRouter(AppTranslate);
export default AppWithRouter;
