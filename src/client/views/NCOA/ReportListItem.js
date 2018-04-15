import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import accounting from 'accounting';
import S from 'string';

import { amountFormat } from './util';

const ReportListItem = ({ item: report, path, t }) => {
  return (
    <Link className="report-list-item" to={`${path}/${report.code}`}>
      <div className="card-header">
        {report.schedule === 'Y' && `${report.code} - `}
        {t(report.name)}
      </div>
      <ul className="card-body">
        {/* <pre>{JSON.stringify(report.mainGroups, null, 2)}</pre> */}
        {report.mainGroups.map(group => (
          <li key={group.groupValue}>
            <span>{S(t(group.groupName).toLowerCase()).titleCase().s}</span>
            <span className="text-muted amount">
              {accounting.formatMoney(group.groupAmount, amountFormat)}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default translate()(ReportListItem);
