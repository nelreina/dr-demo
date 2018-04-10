import React, { Component } from 'react';
import { translate } from 'react-i18next';
import List from '../components/List';

class PeriodSelector extends Component {
  state = { key: '' };

  componentWillMount() {
    const { periods } = this.props;
    const key = periods.activePeriod.id;
    this.setState(() => ({ key }));
  }

  handleChange = evt => {
    const key = evt.target.value;
    console.info('###########', key);
    this.setState(() => ({ key }));
    this.props.action(key);
  };
  render() {
    const { t, periods, action } = this.props;
    return (
      <div>
        <select value={this.state.key} onChange={this.handleChange}>
          <option value="433">Jan 2018</option>
          <option value="436">Feb 2018</option>
        </select>
        {/* <pre>{JSON.stringify(periods, null, 2)}</pre> */}
      </div>
    );
  }
}

export default translate()(PeriodSelector);
