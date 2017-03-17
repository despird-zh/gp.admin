import { Map } from 'immutable';

import {
	OPEN_SIGNIN_ACT,
  SIGNIN_ACT,
  SIGNOFF_ACT,
  AUTH_ACT_START,
  AUTH_ACT_END,
  REISSUE_TOKEN_ACT,
  FETCH_TOKEN_ACT
} from '../actions/authActions';

const BLIND_TOKEN = '__blind_token__';

const initialState = Map({
	opening: false,
  rpcinvoking: false,
  account: '',
  credential: '',
  audience: 'gp.admin',
  jwttoken: BLIND_TOKEN,
  authenticated: false,
  message: '',
});

const actionsMap = {
	[OPEN_SIGNIN_ACT]: (state, action) => {
    const opening = action.data;

    return state.merge({
      opening,
    });
  },
  [AUTH_ACT_START]: (state, action) => {

    return state.merge({
      rpcinvoking: true,
      account: action.data,
    });
  },
  [AUTH_ACT_END]: (state, action) => {

    const respdata = action.data;

    return state.merge({
      rpcinvoking: false,
      message: respdata.meta.message,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}