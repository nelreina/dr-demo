import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import accounting from 'accounting';
import List from '../../../components/List';

import FilterDetails from './FilterDetails';
import { style, amountFormat, calcSumDetails, filterSelector } from '../util';
import * as actions from '../../../store/reducers/ncoaDetails';
import RowDetails from './RowDetails';
class NCOADetails extends Component {
  componentWillMount() {
    const { match, fetchNcoaDetails } = this.props;
    const { id, account, col } = match.params;
    fetchNcoaDetails(id, account, col);
  }

  render() {
    const { t, data, match, history } = this.props;
    const { account, col, descr } = match.params;
    let title = `${t('Details of')} ${t('Account')}: ${account}`;
    title += ` - ${t(descr)}`;
    // const { data } = details;
    const sum = calcSumDetails(data);
    return (
      <div>
        <h6 style={style.rightAlign} className="text-muted">
          {title}
        </h6>
        <h6 style={style.rightAlign} className="text-info">
          Total: {accounting.formatMoney(sum, amountFormat)}
        </h6>
        <p style={style.rightAlign} className="text-muted">
          <small>Count: {data.length}</small>
        </p>
        <hr />
        <FilterDetails />
        <hr />
        <table style={style.zoom} className="table table-sm">
          <thead>
            <tr>
              <th>Row</th>
              <th>Counterparty ID</th>
              <th>Counterparty Name</th>
              <th>Group</th>
              <th>Contract ID</th>
              <th>Accounting Ledger</th>
              <th style={style.rightAlign}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <List
              of={RowDetails}
              iterator={data}
              style={style}
              amountFormat={amountFormat}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
const msp = state => ({
  data: filterSelector(state)
});
export default translate()(connect(msp, actions)(NCOADetails));
