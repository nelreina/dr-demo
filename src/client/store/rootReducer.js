import { combineReducers } from 'redux';
import { auth } from 'nelreina-web-utils';
import { reducer as formReducer } from 'redux-form';
import bankload from './reducers/bankload';
import ncoa from './reducers/ncoa';
import ncoaDetails from './reducers/ncoaDetails';
import periods from './reducers/periods';
import reports from './reducers/reports';
import translations from './reducers/translations';

export default combineReducers({
  auth,
  form: formReducer,
  bankload,
  ncoa,
  ncoaDetails,
  periods,
  reports,
  translations
});
