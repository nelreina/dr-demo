import React, { Component } from 'react';
import * as actions from './store/reducers/periods';
import { connect } from 'react-redux';

class App extends Component {
  componentWillMount() {
    this.props.fetchPeriods();
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export default connect(state => state, actions)(App);
