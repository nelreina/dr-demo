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
      <button onClick={props.history.goBack} className="btn btn-link">
        Go back
      </button>
    </div>
  );
};

export default translate()(NotFound);
