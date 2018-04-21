import React from 'react';
import NCOAHeader from './NCOAHeader';
import Row from './Row';
import List from 'nr-react-list';

const NCOATable = ({ data, report, options }) => {
  const { style } = options;
  return (
    <table style={style.zoom} className="table table-sm">
      <NCOAHeader options={options} report={report} />
      <tbody>
        {data &&
          data.length > 0 && (
            <List of={Row} iterator={data} options={options} />
          )}
        {data.length === 0 && (
          <tr>
            <td>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NCOATable;
