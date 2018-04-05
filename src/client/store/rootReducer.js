import { combineReducers } from 'redux';
import { auth } from 'nelreina-web-utils';
import ncoa from './reducers/ncoa';
import periods from './reducers/periods';
import reports from './reducers/reports';
import translations from './reducers/translations';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  form: formReducer,
  ncoa,
  periods,
  reports,
  translations
});
