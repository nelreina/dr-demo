import { api } from 'nelreina-web-utils';
import { assign } from 'lodash';

const FETCHING = 'FETCHING_NCOADETAILS';
const FETCH_SUCCESS = 'FETCH_NCOADETAILS_SUCCESS';
const FETCH_ERROR = 'FETCH_NCOADETAILS_ERROR';

const { get } = api;
const initialState = { data: [] };

export const fetchNcoaDetails = (ReportCode, account, col) => async (
  dispatch,
  getState
) => {
  dispatch({ type: FETCHING });
  const state = getState();
  const MatchProcessId =
    state.periods && state.periods.activePeriod
      ? state.periods.activePeriod.id
      : null;
  if (!MatchProcessId) return;
  const key = `${MatchProcessId} - ${ReportCode}`;
  const payload = await get(`/api/ncoa/${key}-D/${account}/${col}`);
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
