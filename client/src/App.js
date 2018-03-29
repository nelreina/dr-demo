import React, { Component } from 'react';
import { api } from 'nelreina-web-utils';
const { get } = api;
export default class App extends Component {
  state = {};
  async componentWillMount() {
    const data = await get('/api/loads');
    this.setState({ data });
  }
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
