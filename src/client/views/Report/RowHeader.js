import React from 'react';
import { translate } from 'react-i18next';

const RowHeader = ({ row, options, t }) => {
  const { style } = options;
  return (
    <tr className="table-primary">
      <td style={style.nowrap}>
        <h6>{row.CoaCode}</h6>
      </td>
      <td colSpan="6">
        <h6>{t(row.RowDescription)}</h6>
      </td>
    </tr>
  );
};

export default translate()(RowHeader);
