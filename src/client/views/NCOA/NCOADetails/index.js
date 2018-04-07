import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import accounting from 'accounting';

import { style, amountFormat, calcSumDetails } from '../util';
import * as actions from '../../../store/reducers/ncoaDetails';
class NCOADetails extends Component {
  componentWillMount() {
    const { match, fetchNcoaDetails } = this.props;
    const { id, account, col } = match.params;
    fetchNcoaDetails(id, account, col);
  }

  render() {
    const { t, details, match, history } = this.props;
    const { account, col, descr } = match.params;
    let title = `${t('Details of')} ${t('Account')}: ${account}`;
    title += ` - ${t(descr)}`;
    const { data } = details;
    const sum = calcSumDetails(data);
    return (
      <div>
        <h5 style={style.rightAlign} className="text-muted">
          {title}
        </h5>
        <h5 style={style.rightAlign} className="text-primary">
          Total: {accounting.formatMoney(sum, amountFormat)}
        </h5>
        <p style={style.rightAlign} className="text-muted">
          <small>Count: {data.length}</small>
        </p>
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
            {data.map(d => (
              <tr key={d.R0000}>
                <td>
                  <a style={style.link}>{d.R0000}</a>
                </td>
                <td>{d.E0014}</td>
                <td>{d.E0015}</td>
                <td>{d.E0024}</td>
                <td>{d.E0035}</td>
                <td>{d.E0047}</td>
                <td style={style.rightAlign}>
                  {accounting.formatMoney(d.Amount, amountFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const msp = state => ({
  details: state.ncoaDetails
});
export default translate()(connect(msp, actions)(NCOADetails));
