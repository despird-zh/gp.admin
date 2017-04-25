import { Map } from 'immutable';

import {
  OPEN_SIGNIN_ACT,
  SAVE_TOKEN_ACT,
  PURGE_TOKEN_ACT,
  AUTH_ACT_START,
  AUTH_ACT_END,
} from '../actions/authActions';

const BLIND_TOKEN = '__blind_token__';

const initialState = Map({
  opening: false,
  authing: false,
  account: '',
  credential: '',
  audience: 'gp.admin',
  jwttoken: BLIND_TOKEN,
  authenticated: false,
  message: '',
});

const actionsMap = {
  [OPEN_SIGNIN_ACT]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      opening: data,
      message: '',
    });
  },
  [AUTH_ACT_START]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      authing: true,
      account: data,
    });
  },
  [SAVE_TOKEN_ACT]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      credential: data.credential,
      jwttoken: data.token,
    });
  },
  [AUTH_ACT_END]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      authing: false,
      message: data.meta.message,
      opening: data.meta.code !== 'VALID_TOKEN',
      authenticated: data.meta.code === 'VALID_TOKEN',
    });
  },
  [PURGE_TOKEN_ACT]: (state, { type }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      account: '',
      credential: '',
      jwttoken: BLIND_TOKEN,
      authenticated: false,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
