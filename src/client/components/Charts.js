import React from 'react';
import { connect } from 'react-redux';

import ChartMatchUnMatch from './ChartMatchUnMatch';
import ChartCreditCardCarLoans from './ChartCreditCardCarLoans';

import { ccChartSelector } from '../views/NCOA/util';

const Charts = ({ bankload, ccdata }) => {
  return (
    <div className="charts">
      <div>
        <ChartMatchUnMatch data={bankload.data} />
      </div>
      <div>
        {/* <pre>{JSON.stringify(ccdata, null, 2)}</pre> */}
        <ChartCreditCardCarLoans data={ccdata} />
      </div>
    </div>
  );
};

export default connect(state => ({
  bankload: state.bankload,
  ccdata: ccChartSelector(state)
}))(Charts);
