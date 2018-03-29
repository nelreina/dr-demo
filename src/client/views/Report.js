import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/reducers/ncoa';

class Report extends Component {
  componentWillMount() {
    const { match: { params }, periodId } = this.props;
    if (periodId) {
      const id = `${periodId} - ${params.id}`;
      this.props.fetchNcoa(id);
    }
  }

  render() {
    const { match: { params }, data } = this.props;
    const rows =
      data && data.filter(row => row.CoaCode && row.CoaCode.startsWith('11'));
    const reportName = params.id;
    return (
      <div>
        <h3>{reportName}</h3>
        <table style={{ zoom: '85%' }} className="table table-sm">
          <thead>
            <tr>
              <th>Account</th>
              <th>Description</th>
              <th>Col 1</th>
              <th>Col 2</th>
              <th>Col 3</th>
              <th>Col 4</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, key) => (
              <tr key={key}>
                <td>{row.CoaCode}</td>
                <td>{row.RowDescription}</td>
                <td>{row.col1}</td>
                <td>{row.col2}</td>
                <td>{row.col3}</td>
                <td>{row.col4}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(rows, null, 2)}</pre> */}
      </div>
    );
  }
}
const msp = state => ({
  data: state.ncoa.data ? state.ncoa.data : [],
  periodId: state.periods.activePeriod ? state.periods.activePeriod.id : null
});
export default connect(msp, actions)(Report);
