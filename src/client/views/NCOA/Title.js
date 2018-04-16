import React from 'react';
import { translate } from 'react-i18next';
import ExportToolbar from '../../components/ExportToolbar';
import { connect } from 'react-redux';

const Title = ({ t, children, goback, details, ncoa, ncoaDetails }) => {
  const goBackText = 'GO BACK';
  const goBackClass = 'btn btn-light btn-sm';
  return (
    <div className="report-header">
      <button className={goBackClass} onClick={goback}>
        {t(goBackText)}
      </button>
      <h5>{children}</h5>
      <ExportToolbar data={details ? ncoaDetails.data : ncoa.data} />
    </div>
  );
};

export default connect(state => state)(translate()(Title));
