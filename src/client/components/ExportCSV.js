import { CSVLink } from 'react-csv/lib';
import React from 'react';
// import converter from 'json2csv';

const ExportCSV = ({ t, data, fontSize, filename }) => {
  //   const csv = converter(data);
  const csv = data;
  return (
    <CSVLink
      data={csv}
      filename={`${filename}.csv`}
      className="btn btn-success btn-sm btn-icon-csv"
      target=""
    >
      Export to CSV
    </CSVLink>
  );
};

export default ExportCSV;
