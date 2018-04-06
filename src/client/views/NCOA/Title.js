import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const Title = ({ t, children }) => {
  return (
    <div className="report-header">
      <Link to={`/reports`} className="btn btn-light">
        {t('GO BACK')}
      </Link>
      <h3>{children}</h3>
    </div>
  );
};

export default translate()(Title);
