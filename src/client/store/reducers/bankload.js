import { assign } from 'lodash';

const FETCHING = 'FETCHING_BANKLOAD';
const FETCH_SUCCESS = 'FETCH_BANKLOAD_SUCCESS';
const FETCH_ERROR = 'FETCH_BANKLOAD_ERROR';

const initialState = { data: {} };

export const fetchBankload = matchId => async (dispatch, getState, api) => {
  if (!matchId) return;
  dispatch({ type: FETCHING });
  const payload = await api.get(`/api/bankload - ${matchId}`);
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
      return assign({}, state, { error: false, fetching: true, data: {} });
    case FETCH_ERROR:
      return assign({}, state, { error: true, message: payload, data: {} });

    default:
      return state;
  }
};
