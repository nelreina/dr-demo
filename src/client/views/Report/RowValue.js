import React from 'react';
import accounting from 'accounting';
const RowValue = ({ row, options }) => {
  const { style: { rightAlign }, amountFormat, cols } = options;
  return (
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>{row.CoaCode}</td>
      <td>{row.RowDescription}</td>
      {cols.map(col => (
        <td style={rightAlign}>
          {accounting.formatMoney(row[col], amountFormat)}
        </td>
      ))}
    </tr>
  );
};

export default RowValue;
