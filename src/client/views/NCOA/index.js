import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { assign, reduce, isEqual } from 'lodash';
import { Switch, Route, Link } from 'react-router-dom';

import * as actions from '../../store/reducers/ncoa';
import { style, amountFormat, getColsArray, getReportName } from './util';
import NCOATable from './NCOATable';
import NCOADetails from './NCOADetails';
import Title from './Title';

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
      match: { params, url, isExact },
      history,
      data,
      reports,
      t,
      activePeriod
    } = this.props;
    const report = reports[params.id] || {};
    let reportName = getReportName(report, activePeriod, t);
    const cols = getColsArray(report);
    const options = { style, amountFormat, cols, url, header: style.header };
    return (
      <div>
        {isExact ? (
          <Title url="/reports">{reportName}</Title>
        ) : (
          <Title goback={history.goBack}>{reportName}</Title>
        )}
        <Switch>
          <Route path={`/reports/:id/:account/:col`} component={NCOADetails} />

          <Route
            path="/"
            render={props => (
              <NCOATable data={data} report={report} options={options} />
            )}
          />
        </Switch>
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
