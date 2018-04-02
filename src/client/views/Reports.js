import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

const Reports = props => {
  const { reports, periodId, match: { path }, t } = props;
  const keys = Object.keys(reports);
  const list = keys.map(k => reports[k]);
  return (
    <div className="list-group">
      {list.map((report, key) => (
        <Link
          className="list-group-item"
          key={key}
          to={`${path}/${report.code}`}
        >
          <h5>{t(report.name)}</h5>
        </Link>
      ))}
    </div>
  );
};

export default translate()(
  connect(state => ({
    reports: state.reports.data ? state.reports.data : {}
  }))(Reports)
);
