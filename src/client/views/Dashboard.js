import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { assign } from 'lodash';

import * as actionsNcoa from '../store/reducers/ncoa';
import * as actionsPeriods from '../store/reducers/periods';

import List from '../components/List';
import PeriodSelector from '../components/PeriodSelector';
import DashboardItem from './DashboardItem';
class Dashboard extends Component {
  componentWillMount() {
    this.props.clearNcoa();
  }
  setActivePeriod = key => {
    const { periods, setActivePeriod } = this.props;
    setActivePeriod(periods.data[key]);
  };

  render() {
    const { reports, periods, match: { path }, t } = this.props;
    const keys = Object.keys(reports);
    const list = keys.map(k => reports[k]);
    return (
      <div>
        <PeriodSelector periods={periods} action={this.setActivePeriod} />
        <div className="dashboard">
          <List iterator={list} of={DashboardItem} path={path} />
        </div>
      </div>
    );
  }
}
const actions = assign({}, actionsNcoa, actionsPeriods);
export default translate()(
  connect(
    state => ({
      reports: state.reports.data ? state.reports.data : {},
      periods: state.periods
    }),
    actions
  )(Dashboard)
);
