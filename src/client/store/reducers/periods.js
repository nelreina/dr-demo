import { api } from 'nelreina-web-utils';
import { assign } from 'lodash';

const FETCHING = 'FETCHING_PERIODS';
const FETCH_SUCCESS = 'FETCH_PERIODS_SUCCESS';
const FETCH_ERROR = 'FETCH_PERIODS_ERROR';
const SET_ACTIVE_PERIOD = 'SET_ACTIVE_PERIOD';

const { get } = api;
const initialState = {};

export const fetchPeriods = () => async dispatch => {
  dispatch({ type: FETCHING });
  const payload = await get(`/api/periods`);
  dispatch({
    type: FETCH_SUCCESS,
    payload
  });
  const keys = Object.keys(payload);
  const last = keys.length - 1;
  const activePeriod = payload[keys[last]];
  dispatch({ type: SET_ACTIVE_PERIOD, payload: activePeriod });
  return activePeriod;
};

export const setActivePeriod = period => ({
  type: SET_ACTIVE_PERIOD,
  payload: period
});

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return assign({}, state, {
        error: false,
        fetching: false,
        data: payload
      });
    case FETCHING:
      return assign({}, state, { error: false, fetching: true, data: [] });
    case FETCH_ERROR:
      return assign({}, state, { error: true, message: payload, data: [] });
    case SET_ACTIVE_PERIOD:
      return assign({}, state, { activePeriod: payload });

    default:
      return state;
  }
};
