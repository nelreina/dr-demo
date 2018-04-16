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
      className="btn btn-light"
      target=""
    >
      <i
        style={{ color: '#2DA139', fontSize }}
        className="fa fa-file-excel-o"
      />
    </CSVLink>
  );
};

export default ExportCSV;
