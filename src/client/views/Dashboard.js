import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { assign } from 'lodash';

import * as actionsNcoa from '../store/reducers/ncoa';
import * as actionsBankload from '../store/reducers/bankload';
import * as actionsPeriods from '../store/reducers/periods';
import * as actionsReports from '../store/reducers/reports';

import PeriodSelector from '../components/PeriodSelector';
import Charts from '../components/Charts';
import { dashboardSelector } from './NCOA/util';
import ReportListView from './NCOA/ReportListView';
class Dashboard extends Component {
  componentWillMount() {
    this.props.clearNcoa();
  }
  setActivePeriod = key => {
    const {
      periods,
      setActivePeriod,
      fetchReports,
      fetchBankload
    } = this.props;
    setActivePeriod(periods.data[key]);
    fetchReports(key);
    fetchBankload(key);
  };

  render() {
    const {
      list,
      periods,
      match: { path },
      t
    } = this.props;
    return (
      <div className="dashboard">
        <PeriodSelector periods={periods} action={this.setActivePeriod} />
        <hr />
        <Charts />
        <hr />
        <ReportListView list={list} />
      </div>
    );
  }
}
const actions = assign(
  {},
  actionsBankload,
  actionsNcoa,
  actionsPeriods,
  actionsReports
);
export default translate()(
  connect(
    state => ({
      list: dashboardSelector(state),
      periods: state.periods
    }),
    actions
  )(Dashboard)
);
