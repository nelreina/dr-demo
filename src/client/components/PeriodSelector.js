import React, { Component } from 'react';
import { translate } from 'react-i18next';
import List from 'nr-react-list';

import PeriodOption from './PeriodOption';
class PeriodSelector extends Component {
  state = { key: '' };

  componentWillMount() {
    const { periods } = this.props;
    const key = periods.activePeriod.id;
    this.setState(() => ({ key }));
  }

  handleChange = evt => {
    const key = evt.target.value;
    this.setState(() => ({ key }));
    this.props.action(key);
  };
  render() {
    const { t, periods, action } = this.props;
    return (
      <div>
        <select
          className="form-control"
          value={this.state.key}
          onChange={this.handleChange}
        >
          <List of={PeriodOption} iterator={periods.data} isobject />
        </select>
        {/* <pre>{JSON.stringify(periods, null, 2)}</pre> */}
      </div>
    );
  }
}

export default translate()(PeriodSelector);
