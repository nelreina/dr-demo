import { combineReducers } from 'redux';
import { auth } from 'nelreina-web-utils';
import ncoa from './reducers/ncoa';
import ncoaDetails from './reducers/ncoaDetails';
import periods from './reducers/periods';
import reports from './reducers/reports';
import translations from './reducers/translations';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  form: formReducer,
  ncoa,
  ncoaDetails,
  periods,
  reports,
  translations
});
