import React from 'react';
import { translate } from 'react-i18next';

const RowHeader = ({ row, options, t }) => {
  const { style } = options;
  return (
    <tr className="table-primar">
      <td colSpan="7">
        <h5 className="text-center text-uppercase">
          {row.CoaCode} -
          {t(row.RowDescription)}
        </h5>
      </td>
    </tr>
  );
};

export default translate()(RowHeader);
