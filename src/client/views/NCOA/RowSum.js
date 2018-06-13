import React from 'react';
import accounting from 'accounting';
import { reduce } from 'lodash';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ncoaFormat } from './util';

const calcSum = (data, SumRow, group) => {
  const sumCols = {
    Col1: 0,
    Col2: 0,
    Col3: 0,
    Col4: 0,
    Total: 0
  };
  const calcRows = data.filter(
    row => row.CoaCode.startsWith(SumRow[group]) && row.RowType === 'VAL'
  );
  reduce(
    calcRows,
    (sum, row) => {
      sum.Col1 += row.Col1;
      sum.Col2 += row.Col2;
      sum.Col3 += row.Col3;
      sum.Col4 += row.Col4;
      sum.Total += row.Total;
      return sum;
    },
    sumCols
  );
  return sumCols;
};

const RowSum = ({ row, options, data, t }) => {
  const {
    style: { rightAlign, nowrap },
    cols
  } = options;
  const sum = data ? calcSum(data, row, 'SumGroup') : {};
  return (
    <tr className="ncoa-row-sum table-success">
      <th style={nowrap}>{row.CoaCode}</th>
      <th className="text-uppercase">TOTAL {t(row.RowDescription)}</th>
      {cols.map(col => (
        <th style={rightAlign} className="amount" key={col}>
          {accounting.formatMoney(sum[col] / 1000, ncoaFormat)}
        </th>
      ))}
    </tr>
  );
};

export default translate()(
  connect(state => ({
    data: state.ncoa.data
  }))(RowSum)
);
