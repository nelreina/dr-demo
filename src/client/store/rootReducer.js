import { combineReducers } from 'redux';
import { auth } from 'nelreina-web-utils';
import ncoa from './reducers/ncoa';
import periods from './reducers/periods';
import reports from './reducers/reports';
export default combineReducers({
  auth,
  ncoa,
  periods,
  reports
});
