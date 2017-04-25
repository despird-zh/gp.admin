import { Map, List } from 'immutable';

import {
  SEC_SAVE_USERS, SEC_SAVE_USERS_FILTER, SEC_CLEAR_USERS_FILTER, SEC_SAVE_EDIT_USER, SEC_SAVE_ADD_USER,
} from '../actions/securityActions';

const initialState = Map({
  userlist: Map({
    users: List(),
    search: '',
    internal: false,
    external: false,
  }),
  useredit: Map({
    user: Map(),
  }),
  useradd: Map({
    user: Map(),
  }),
});

const actionsMap = {

  [SEC_SAVE_USERS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['userlist', 'users'], data);
  },

  [SEC_SAVE_USERS_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'userlist': data });
  },

  [SEC_SAVE_EDIT_USER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'useredit': { 'user': data } });
  },

  [SEC_SAVE_ADD_USER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'useradd': { 'user': data } });
  },

  [SEC_CLEAR_USERS_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    const newState = state.mergeDeep({ 'userlist': data });
    return newState.setIn(['userlist', 'users'], List());
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
