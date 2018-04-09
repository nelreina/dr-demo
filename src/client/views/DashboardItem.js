import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const DashboardItem = ({ item: report, path, t }) => {
  return (
    <Link className="dashboard-item" to={`${path}/${report.code}`}>
      <div className="card-header">{t(report.name)}</div>
      <ul className="card-body">
        {/* <pre>{JSON.stringify(report.mainGroups, null, 2)}</pre> */}
        {report.mainGroups.map(group => (
          <li key={group.groupValue}>
            <span>
              {group.group} {group.groupName}
            </span>
            <span>{group.groupAmount}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default translate()(DashboardItem);
