import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import * as actions from '../store/reducers/ncoa';
import List from '../components/List';
import DashboardItem from './DashboardItem';
class Dashboard extends Component {
  componentWillMount() {
    this.props.clearNcoa();
  }

  render() {
    const { reports, periodId, match: { path }, t } = this.props;
    const keys = Object.keys(reports);
    const list = keys.map(k => reports[k]);
    return (
      <div className="dashboard">
        <List iterator={list} of={DashboardItem} path={path} />
      </div>
    );
  }
}

export default translate()(
  connect(
    state => ({
      reports: state.reports.data ? state.reports.data : {}
    }),
    actions
  )(Dashboard)
);
