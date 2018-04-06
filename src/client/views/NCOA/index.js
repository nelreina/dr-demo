import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { assign, reduce, isEqual } from 'lodash';
import { Link } from 'react-router-dom';
import S from 'string';

import * as actions from '../../store/reducers/ncoa';
import Row from './Row';
import NCOAHeader from './NCOAHeader';
import { style, amountFormat, getColsArray } from './util';

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
    const { match: { params } } = props;
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
    let reportName = report && t(report.name);
    console.info('reportName', reportName);
    if (reportName) {
      if (typeof String) {
        reportName = S(reportName).truncate(35).s;
      }
    }
    const cols = getColsArray(report);
    const options = { style, amountFormat, cols, url, reportName };
    return (
      <div>
        <div className="report-header">
          <Link to={`/reports`} className="btn btn-light">
            {t('GO BACK')}
          </Link>
          <h3>
            {reportName} - {activePeriod && activePeriod.name}
          </h3>
        </div>
        <table style={{ zoom: '70%' }} className="table table-sm">
          <NCOAHeader options={{ header: style.header }} report={report} />
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
