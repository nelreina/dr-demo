import React, { Component } from 'react';
import { assign } from 'lodash';
import * as periodsActions from './store/reducers/periods';
import * as reportsActions from './store/reducers/reports';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, NavLink } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Reports from './views/Reports';
import Report from './views/Report';
class App extends Component {
  componentWillMount() {
    this.props.fetchPeriods();
    this.props.fetchReports();
  }

  render() {
    return (
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/reports">
              Reports
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Dashboard} />
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
export default withRouter(connect(state => state, actions)(App));
