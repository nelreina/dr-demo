import React from 'react';
import RowValue from './RowValue';
import RowHeader from './RowHeader';
import RowSum from './RowSum';
const Row = ({ row, options }) => {
  let retRow = '';
  switch (row.RowType) {
    case 'HD':
      retRow = <RowHeader row={row} options={options} />;
      break;

    case 'SUM':
      retRow = <RowSum row={row} options={options} />;
      break;

    default:
      retRow = <RowValue row={row} options={options} />;
      break;
  }
  return retRow;
};

export default Row;
