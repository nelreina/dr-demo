import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const Title = ({ t, children, goback, url = '/' }) => {
  const goBackText = 'GO BACK';
  const goBackClass = 'btn btn-light';
  return (
    <div className="report-header">
      {goback ? (
        <button className={goBackClass} onClick={goback}>
          {t(goBackText)}
        </button>
      ) : (
        <Link to={url} className={goBackClass}>
          {t(goBackText)}
        </Link>
      )}
      <h4>{children}</h4>
    </div>
  );
};

export default translate()(Title);
