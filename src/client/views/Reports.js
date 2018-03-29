import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Reports = props => {
  const { list, periodId, match: { path } } = props;
  return (
    <div className="list-group">
      {list.map((report, key) => (
        <Link className="list-group-item" key={key} to={`${path}/${report}`}>
          <h5>{report}</h5>
        </Link>
      ))}
    </div>
  );
};
export default connect(state => ({
  list: state.reports.data ? state.reports.data : []
}))(Reports);
