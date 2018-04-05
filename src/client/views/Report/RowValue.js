import React from 'react';
import accounting from 'accounting';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
const RowValue = ({ row, options, t }) => {
  const { style: { rightAlign }, amountFormat, cols, url } = options;
  return (
    <tr>
      <td style={{ whiteSpace: 'nowrap' }}>{row.CoaCode}</td>
      <td>{t(row.RowDescription.trim())}</td>
      {cols.map(col => (
        <td style={rightAlign} key={col}>
          {col === 'Total' ? (
            <span>{accounting.formatMoney(row[col], amountFormat)}</span>
          ) : (
            <Link to={`${url}/${row.CoaCode}/${col.replace('Col', '')}`}>
              {accounting.formatMoney(row[col], amountFormat)}
            </Link>
          )}
        </td>
      ))}
    </tr>
  );
};

export default translate()(RowValue);
