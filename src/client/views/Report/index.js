import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, reduce } from 'lodash';
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
    cols.push('col' + i);
  }
  return cols;
};
class Report extends Component {
  componentWillMount() {
    this.fetchNCOA(this.props);
  }
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.info('should', 'this.props', this.props);
  //   console.info('should', 'nextProps', nextProps);
  //   const should =
  //     (nextProps.periodId !== this.props.periodId &&
  //       nextProps.data.length === 0) ||
  //     this.props.data.length !== nextProps.data.length;
  //   return should;
  // };

  componentDidUpdate() {
    // this.fetchNCOA(this.props);
  }
  fetchNCOA = props => {
    const { match: { params }, periodId, data } = props;
    // console.info(params, periodId, data);
    if (periodId) {
      const id = `${periodId} - ${params.id}`;
      props.fetchNcoa(id);
    }
  };
  render() {
    const { match: { params }, data, reports } = this.props;
    const rows = data;
    const report = reports[params.id];
    const cols = getColsArray(report);
    const options = { style, amountFormat, cols };
    return (
      <div>
        <h3>{report && report.name}</h3>
        <table style={{ zoom: '70%' }} className="table table-sm">
          <ReportHeader options={{ header }} report={report} />
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
  reports: state.reports.data ? state.reports.data : {},
  periodId: state.periods.activePeriod ? state.periods.activePeriod.id : null
});
export default connect(msp, actions)(Report);
