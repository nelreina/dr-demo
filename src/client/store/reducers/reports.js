import { assign } from 'lodash';

const FETCHING = 'FETCHING_REPORTS';
const FETCH_SUCCESS = 'FETCH_REPORTS_SUCCESS';
const FETCH_ERROR = 'FETCH_REPORTS_ERROR';

const initialState = {};

export const fetchReports = matchId => async (dispatch, getState, api) => {
  if (!matchId) return;
  dispatch({ type: FETCHING });
  const payload = await api.get(`/api/reports/${matchId}`);
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
