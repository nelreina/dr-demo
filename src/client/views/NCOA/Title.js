import React from 'react';
import { translate } from 'react-i18next';
import ExportToolbar from '../../components/ExportToolbar';
import { connect } from 'react-redux';

const Title = ({ t, children, goback, details, ncoa, ncoaDetails }) => {
  const goBackText = 'Go back';
  let filename = children;
  filename += details ? ' Details' : '';
  const goBackClass = 'btn btn-secondary btn-sm';
  return (
    <div className="report-header">
      <div className="titleHeader">
        <h2>{children}</h2>
        <button className={goBackClass} onClick={goback}>
          {t(goBackText)}
        </button>
      </div>
      <div className="actionButtons">
        <ExportToolbar
          filename={filename}
          data={details ? ncoaDetails.data : ncoa.data}
        />
      </div>
    </div>
  );
};

export default connect(state => state)(translate()(Title));
