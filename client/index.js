import React from 'react';
import { render } from 'react-dom';
import App from './src/App';
import 'babel-polyfill';

render(<App />, document.querySelector('#root'));
