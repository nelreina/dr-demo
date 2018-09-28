import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import S from 'string';
import List from 'nr-react-list';

import NavLinkItem from '../../components/NavLinkItem';
import ReportListView from './ReportListView';
import { tabNavSelector, reportGroupSelector } from './util';

const ReportList = ({ t, tabs, reportGroup, match, location }) => {
  return (
    <div>
      <h2>Reports</h2>
      <nav className="nav navStyling">
        <List of={NavLinkItem} iterator={tabs} />
      </nav>
      {match.isExact && <Redirect to={`${match.path}/tab/main reports`} />}
      <Route
        path="/reportlist/tab/:group"
        render={({ match }) => {
          const groupID = S(match.params.group).titleCase().s;
          const list = reportGroup[groupID];
          return <ReportListView list={list || []} />;
        }}
      />
    </div>
  );
};

export default connect(state => ({
  tabs: tabNavSelector(state),
  reportGroup: reportGroupSelector(state)
}))(translate()(ReportList));
