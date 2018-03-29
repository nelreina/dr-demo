import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/reducers/ncoa';

class Report extends Component {
  componentWillMount() {
    const { match: { params }, periodId } = this.props;
    const id = `${periodId} - ${params.id}`;
    this.props.fetchNcoa(id);
  }

  render() {
    const { match: { params }, data } = this.props;
    const reportName = params.id;
    return (
      <div>
        <h3>{reportName}</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}
const msp = state => ({
  data: state.ncoa.data ? state.ncoa.data : [],
  periodId: state.periods.activePeriod ? state.periods.activePeriod.id : null
});
export default connect(msp, actions)(Report);
