import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Reports = props => {
  const { reports, periodId, match: { path } } = props;
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
          <h5>{report.name}</h5>
        </Link>
      ))}
    </div>
  );
};
export default connect(state => ({
  reports: state.reports.data ? state.reports.data : {}
}))(Reports);
