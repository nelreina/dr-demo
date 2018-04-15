import React from 'react';
import { connect } from 'react-redux';

import ChartMatchUnMatch from './ChartMatchUnMatch';
import ChartCreditCardCarLoans from './ChartCreditCardCarLoans';

const Charts = ({ bankload }) => {
  return (
    <div className="charts">
      <div>
        <ChartMatchUnMatch data={bankload.data} />
      </div>
      <div>
        <ChartCreditCardCarLoans data={{ cc: 2761078.01, cl: 10462247 }} />
      </div>
    </div>
  );
};

export default connect(state => ({ bankload: state.bankload }))(Charts);
