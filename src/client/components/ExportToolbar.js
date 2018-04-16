import React from 'react';
import { translate } from 'react-i18next';
const fontSize = '1.5em';
const ExportToolbar = ({ t, data }) => {
  return (
    <div className="btn-group export-toolbar">
      <button className="btn btn-light">
        <i
          style={{ color: '#2DA139', fontSize }}
          className="fa fa-file-excel-o"
        />
      </button>
      <button className="btn btn-light">
        <i
          style={{ color: '#D12836', fontSize }}
          className="fa fa-file-pdf-o"
        />
      </button>
    </div>
  );
};

export default translate()(ExportToolbar);
