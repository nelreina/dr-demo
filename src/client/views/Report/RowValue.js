import React from 'react';
import accounting from 'accounting';
import { translate } from 'react-i18next';

const RowValue = ({ row, options, t }) => {
  const { style: { rightAlign }, amountFormat, cols } = options;
  return (
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>{row.CoaCode}</td>
      <td>{t(row.RowDescription.trim())}</td>
      {cols.map(col => (
        <td style={rightAlign} key={col}>
          {accounting.formatMoney(row[col], amountFormat)}
        </td>
      ))}
    </tr>
  );
};

export default translate()(RowValue);
