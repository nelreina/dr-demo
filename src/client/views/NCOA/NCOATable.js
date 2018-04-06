import React from 'react';
import NCOAHeader from './NCOAHeader';
import Row from './Row';

const NCOATable = ({ data, report, options }) => {
  return (
    <table style={{ zoom: '70%' }} className="table table-sm">
      <NCOAHeader options={options} report={report} />
      <tbody>
        {data &&
          data.map((row, key) => <Row key={key} row={row} options={options} />)}
      </tbody>
    </table>
  );
};

export default NCOATable;
