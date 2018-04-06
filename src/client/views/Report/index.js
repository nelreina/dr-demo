import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, reduce, isEqual } from 'lodash';
import { Link } from 'react-router-dom';

import * as actions from '../../store/reducers/ncoa';
import Row from './Row';
import ReportHeader from './ReportHeader';
import { translate } from 'react-i18next';

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
    const {
      match: { params, url },
      data,
      reports,
      t,
      activePeriod
    } = this.props;
    const report = reports[params.id] || {};
    const cols = getColsArray(report);
    const options = { style, amountFormat, cols, url };
    return (
      <div>
        <div className="report-header">
          <h3>
            {report && t(report.name)} - {activePeriod && activePeriod.name}
          </h3>
          <Link to={`/reports`} className="btn btn-light">
            {t('GO BACK')}
          </Link>
        </div>
        <table style={{ zoom: '70%' }} className="table table-sm">
          <ReportHeader options={{ header }} report={report} />
          <tbody>
            {data &&
              data.map((row, key) => (
                <Row key={key} row={row} options={options} />
              ))}
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(this.props.match, null, 2)}</pre> */}
      </div>
    );
  }
}
const msp = state => ({
  data: state.ncoa.data,
  reports: state.reports.data ? state.reports.data : {},
  activePeriod: state.periods.activePeriod
});
export default translate()(connect(msp, actions)(Report));
