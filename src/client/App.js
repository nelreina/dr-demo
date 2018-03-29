import React, { Component } from 'react';
import { assign } from 'lodash';
import * as periodsActions from './store/reducers/periods';
import * as reportsActions from './store/reducers/reports';
import { connect } from 'react-redux';

class App extends Component {
  componentWillMount() {
    this.props.fetchPeriods();
    this.props.fetchReports();
  }

  render() {
    return (
      <div className="container">
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}
const actions = assign({}, periodsActions, reportsActions);
export default connect(state => state, actions)(App);
