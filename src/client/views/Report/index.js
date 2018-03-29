import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, reduce } from 'lodash';
import * as actions from '../../store/reducers/ncoa';
import Row from './Row';

const rightAlign = { textAlign: 'right' };
const nowrap = { whiteSpace: 'nowrap' };
const style = { rightAlign, nowrap };
const header = assign({}, nowrap, rightAlign);
const amountFormat = {
  symbol: '',
  precision: 2,
  thousand: ',',
  format: {
    pos: '%s %v',
    neg: '%s (%v)',
    zero: '%s  -'
  }
};
const options = { style, amountFormat };

class Report extends Component {
  componentWillMount() {
    const { match: { params }, periodId } = this.props;
    if (periodId) {
      const id = `${periodId} - ${params.id}`;
      this.props.fetchNcoa(id);
    }
  }

  render() {
    const { match: { params }, data } = this.props;
    const rows = data;
    const reportName = params.id;
    return (
      <div>
        <h3>{reportName}</h3>
        <table style={{ zoom: '85%' }} className="table table-sm">
          <thead>
            <tr>
              <th>Account</th>
              <th>Description</th>
              <th style={header}>Col 1</th>
              <th style={header}>Col 2</th>
              <th style={header}>Col 3</th>
              <th style={header}>Col 4</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, key) => (
              <Row key={key} row={row} options={options} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const msp = state => ({
  data: state.ncoa.data ? state.ncoa.data : [],
  periodId: state.periods.activePeriod ? state.periods.activePeriod.id : null
});
export default connect(msp, actions)(Report);
