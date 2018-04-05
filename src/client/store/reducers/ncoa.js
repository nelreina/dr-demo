import { api } from 'nelreina-web-utils';
import { assign } from 'lodash';

const FETCHING = 'FETCHING_NCOA';
const FETCH_SUCCESS = 'FETCH_NCOA_SUCCESS';
const FETCH_ERROR = 'FETCH_NCOA_ERROR';
const CLEAR_DATA = 'CLEAR_DATA';

const { get } = api;
const initialState = {};

export const fetchNcoa = ReportCode => async (dispatch, getState) => {
  const state = getState();
  const MatchProcessId =
    state.periods && state.periods.activePeriod
      ? state.periods.activePeriod.id
      : null;
  if (!MatchProcessId) return;
  const id = `${MatchProcessId} - ${ReportCode}`;
  dispatch({ type: FETCHING });
  try {
    const payload = await get(`/api/${id}`);
    dispatch({
      type: FETCH_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error
    });
  }
};
export const clearNcoa = () => ({
  type: CLEAR_DATA
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
      return assign({}, state, {
        error: false,
        fetching: true,
        data: undefined
      });
    case FETCH_ERROR:
      return assign({}, state, { error: true, message: payload, data: [] });
    case CLEAR_DATA:
      return assign({}, state, { data: [] });

    default:
      return state;
  }
};
