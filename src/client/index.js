import React from 'react';
import { render } from 'react-dom';
import App from './App';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import S from 'string';
S.extendPrototype();
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
