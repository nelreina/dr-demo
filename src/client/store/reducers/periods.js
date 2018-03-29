import { api } from 'nelreina-web-utils';
import { assign } from 'lodash';

const FETCHING = 'FETCHING_PERIODS';
const FETCH_SUCCESS = 'FETCH_PERIODS_SUCCESS';
const FETCH_ERROR = 'FETCH_PERIODS_ERROR';

const { get } = api;
const initialState = {};

export const fetchPeriods = () => async dispatch => {
  dispatch({ type: FETCHING });
  const payload = await get(`/api/loads`);
  dispatch({
    type: FETCH_SUCCESS,
    payload
  });
};

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

    default:
      return state;
  }
};
