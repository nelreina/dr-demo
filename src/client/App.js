import React, { Component } from 'react';
import { assign } from 'lodash';
import * as periodsActions from './store/reducers/periods';
import * as reportsActions from './store/reducers/reports';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, NavLink } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Reports from './views/Reports';
class App extends Component {
  componentWillMount() {
    this.props.fetchPeriods();
    this.props.fetchReports();
  }

  render() {
    return (
      <div className="container">
        <div className="nav">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/reports">Reports</NavLink>
        </div>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/reports" exact component={Reports} />
        </Switch>
      </div>
    );
  }
}
const actions = assign({}, periodsActions, reportsActions);
export default withRouter(connect(state => state, actions)(App));
