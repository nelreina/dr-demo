import React from 'react';
import accounting from 'accounting';
import { reduce } from 'lodash';
import { connect } from 'react-redux';
const calcSum = (data, SumRow) => {
  const sumCols = {
    col1: 0,
    col2: 0,
    col3: 0,
    col4: 0
  };
  const calcRows = data.filter(
    row => row.CoaCode.startsWith(SumRow.SumAccounts) && row.RowType === 'VAL'
  );
  reduce(
    calcRows,
    (sum, row) => {
      sum.col1 += row.col1;
      sum.col2 += row.col2;
      sum.col3 += row.col3;
      sum.col4 += row.col4;
      return sum;
    },
    sumCols
  );
  return sumCols;
};

const RowSum = ({ row, options, data }) => {
  const { style: { rightAlign, nowrap }, amountFormat } = options;
  const sum = data ? calcSum(data, row) : {};
  return (
    <tr className="table-secondary">
      <th style={nowrap}>{row.CoaCode}</th>
      <th>{row.RowDescription}</th>
      <th style={rightAlign}>
        {accounting.formatMoney(sum.col1, amountFormat)}
      </th>
      <th style={rightAlign}>
        {accounting.formatMoney(sum.col2, amountFormat)}
      </th>
      <th style={rightAlign}>
        {accounting.formatMoney(sum.col3, amountFormat)}
      </th>
      <th style={rightAlign}>
        {accounting.formatMoney(sum.col4, amountFormat)}
      </th>
      <th style={rightAlign}>
        {accounting.formatMoney(sum.total, amountFormat)}
      </th>
    </tr>
  );
};

export default connect(state => ({
  data: state.ncoa.data
}))(RowSum);
