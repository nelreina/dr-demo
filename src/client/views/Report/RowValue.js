import React from 'react';
import accounting from 'accounting';
const RowValue = ({ row, options }) => {
  const { style: { rightAlign }, amountFormat } = options;
  return (
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>{row.CoaCode}</td>
      <td>{row.RowDescription}</td>
      <td style={rightAlign}>
        {accounting.formatMoney(row.col1, amountFormat)}
      </td>
      <td style={rightAlign}>
        {accounting.formatMoney(row.col2, amountFormat)}
      </td>
      <td style={rightAlign}>
        {accounting.formatMoney(row.col3, amountFormat)}
      </td>
      <td style={rightAlign}>
        {accounting.formatMoney(row.col4, amountFormat)}
      </td>
    </tr>
  );
};

export default RowValue;
