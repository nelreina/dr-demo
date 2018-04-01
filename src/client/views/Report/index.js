import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, reduce, isEqual } from 'lodash';
import * as actions from '../../store/reducers/ncoa';
import Row from './Row';
import ReportHeader from './ReportHeader';

const rightAlign = { textAlign: 'right' };
const centerAlign = { textAlign: 'center' };
const nowrap = { whiteSpace: 'nowrap' };
const style = { rightAlign, nowrap };
const header = assign({}, nowrap, centerAlign);
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
const getColsArray = report => {
  const cols = [];
  for (let i = 1; i <= report.countAmountColumns; i++) {
    cols.push('Col' + i);
  }
  cols.push('Total');
  return cols;
};
class Report extends Component {
  componentWillMount() {
    this.fetchNCOA(this.props);
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (isEqual(nextProps.activePeriod, this.props.activePeriod)) {
      if (nextProps.data) {
        return true;
      }
      return false;
    } else {
      this.fetchNCOA(this.props);
    }
    return true;
  };

  fetchNCOA = props => {
    const { match: { params }, activePeriod } = props;
    props.fetchNcoa(params.id);
  };
  render() {
    const { match: { params }, data, reports } = this.props;
    const report = reports[params.id] || {};
    const cols = getColsArray(report);
    const options = { style, amountFormat, cols };
    return (
      <div>
        <h3>{report && report.name}</h3>
        <table style={{ zoom: '70%' }} className="table table-sm">
          <ReportHeader options={{ header }} report={report} />
          <tbody>
            {data &&
              data.map((row, key) => (
                <Row key={key} row={row} options={options} />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const msp = state => ({
  data: state.ncoa.data,
  reports: state.reports.data ? state.reports.data : {},
  activePeriod: state.periods.activePeriod
});
export default connect(msp, actions)(Report);
