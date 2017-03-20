import { Map } from 'immutable';

import {
	OPEN_SIGNIN_ACT,
  SIGNIN_ACT,
  SIGNOFF_ACT,
  SAVE_TOKEN_ACT,
  RPC_ACT_START,
  RPC_ACT_END,
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
	[OPEN_SIGNIN_ACT]: (state, {type, data}) => {
    return state.merge({
      opening: data,
    });
  },
  [RPC_ACT_START]: (state, {type, data}) => {

    return state.merge({
      rpcinvoking: true,
      account: data,
    });
  },
  [SAVE_TOKEN_ACT]: (state, {type, data}) => {
    return state.merge({
      credential: data.credential,
      jwttoken: data.token,
    });
  },
  [RPC_ACT_END]: (state, {type, data}) => {
    return state.merge({
      rpcinvoking: false,
      message: data.meta.message,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}