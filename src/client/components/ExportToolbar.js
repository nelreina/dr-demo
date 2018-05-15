import React from 'react';
import ExportCSV from './ExportCSV';

const fontSize = '1.5em';
const ExportToolbar = ({ data, filename }) => {
  return (
    <div className="btn-group export-toolbar">
      <button
        onClick={() => window.print()}
        className="btn btn-light">
        <i
          style={{ color: '#D12836', fontSize }}
          className="fa fa-file-pdf-o"
        />
      </button>
      {data && (
        <ExportCSV data={data} filename={filename} fontSize={fontSize} />
      )}{' '}
    </div>
  );
};

export default ExportToolbar;
