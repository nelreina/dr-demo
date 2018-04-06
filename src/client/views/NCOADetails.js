import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import * as actions from '../store/reducers/ncoaDetails';
class NCOADetails extends Component {
  componentWillMount() {
    const { match, fetchNcoaDetails } = this.props;
    const { id, account, col } = match.params;
    fetchNcoaDetails(id, account, col);
  }

  render() {
    const { t, details, match, history } = this.props;
    const { data } = details;
    return (
      <div>
        <button onClick={history.goBack}>{t('GO BACK')}</button>
        <ul style={{ zoom: '85%' }}>
          {data.map(d => (
            <li key={d.R0000}>
              {d.E0015} - {d.Amount}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const msp = state => ({
  details: state.ncoaDetails
});
export default translate()(connect(msp, actions)(NCOADetails));
