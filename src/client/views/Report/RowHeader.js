import React from 'react';

const RowHeader = ({ row, options }) => {
  const { style } = options;
  return (
    <tr className="table-primary">
      <td style={style.nowrap}>
        <h6>{row.CoaCode}</h6>
      </td>
      <td colSpan="6">
        <h6>{row.RowDescription}</h6>
      </td>
    </tr>
  );
};

export default RowHeader;
