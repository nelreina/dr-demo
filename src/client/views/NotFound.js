import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
const NotFound = props => {
  const { t } = props;
  return (
    <div>
      <h3>
        {t('Path')} {props.location.pathname} {t('not found')}
      </h3>
      <Link to="/reports">Go back to Reports</Link>
    </div>
  );
};

export default translate()(NotFound);
