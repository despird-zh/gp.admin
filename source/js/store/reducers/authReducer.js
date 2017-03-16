import { Map } from 'immutable';

import {
	OPEN_SIGNIN_ACT,
  SIGNIN_ACT,
  SIGNOFF_ACT,
  AUTH_ACT_START,
  AUTH_ACT_ERROR,
  AUTH_ACT_SUCCESS,
  REISSUE_TOKEN_ACT,
  FETCH_TOKEN_ACT
} from '../actions/authActions';

const BLIND_TOKEN = '__blind_token__';

const initialState = Map({
	opening: false,
  account: '',
  credential: '',
  audience: 'gp.admin',
  token: BLIND_TOKEN,
  authenticated: false,
});

const actionsMap = {
	[OPEN_SIGNIN_ACT]: (state, action) => {
    const opening = action.data;

    return state.merge({
      opening,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}