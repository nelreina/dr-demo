import React from 'react';
import ExportCSV from './ExportCSV';

const fontSize = '1.5em';
const ExportToolbar = ({ data, filename }) => {
  return (
    <div className="btn-group export-toolbar">
      <button
        onClick={() => window.print()}
        className="btn btn-success btn-sm btn-icon-pdf">
        Export to PDF
      </button>
      {data && (
        <ExportCSV data={data} filename={filename} fontSize={fontSize} />
      )}{' '}
    </div>
  );
};

export default ExportToolbar;
