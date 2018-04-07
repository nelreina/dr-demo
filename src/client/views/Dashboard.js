import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import * as actions from '../store/reducers/ncoa';

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
        {list.map((report, key) => (
          <Link
            className="dashboard-item"
            key={key}
            to={`${path}/${report.code}`}
          >
            <div className="card-header">{t(report.name)}</div>
            <ul className="card-body">
              {/* <pre>{JSON.stringify(report.mainGroups, null, 2)}</pre> */}
              {report.mainGroups.map(group => (
                <li>
                  <span>
                    {group.group} {group.groupName}
                  </span>
                  <span>{group.groupAmount}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
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
