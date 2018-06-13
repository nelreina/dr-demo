import React from 'react';
import accounting from 'accounting';

const RowDetails = ({ item, style, amountFormat }) => {
  return (
    <tr key={item.R0000}>
      <td>
        <a style={style.link}>{item.R0000}</a>
      </td>
      <td>{item.E0014}</td>
      <td>{item.E0015}</td>
      <td>{item.E0024}</td>
      <td>{item.E0035}</td>
      <td>{item.E0047}</td>
      <td style={style.rightAlign} className="amount">
        {accounting.formatMoney(item.Amount, amountFormat)}
      </td>
    </tr>
  );
};

export default RowDetails;
