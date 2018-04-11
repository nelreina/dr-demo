import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import accounting from 'accounting';

import { amountFormat } from './NCOA/util';

const DashboardItem = ({ item: report, path, t }) => {
  return (
    <Link className="dashboard-item" to={`${path}/${report.code}`}>
      <div className="card-header">{t(report.name)}</div>
      <ul className="card-body">
        {/* <pre>{JSON.stringify(report.mainGroups, null, 2)}</pre> */}
        {report.mainGroups.map(group => (
          <li key={group.groupValue}>
            <span>{group.groupName}</span>
            <span>
              {accounting.formatMoney(group.groupAmount, amountFormat)}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default translate()(DashboardItem);
