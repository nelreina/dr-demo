import { api } from 'nelreina-web-utils';
import { assign } from 'lodash';
const FETCH_SUCCESS = 'NCOA_FETCH_SUCCESS';
const FETCH_ERROR = 'NCOA_FETCH_ERROR';
const { get } = api;
const initialState = {};

export const fetchNcoaReport = id => async dispatch => {
  const payload = get(`/api/${id}`);
  dispatch({
    type: FETCH_SUCCESS,
    payload
  });
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return assign({}, state, { data: payload });
    case FETCH_ERROR:
      return assign({}, state, { error: true, message: payload, data: [] });

    default:
      return state;
  }
};
