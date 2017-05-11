import { Map, List } from 'immutable';

import {
  SEC_SAVE_USERS,
  SEC_SAVE_USER_EDIT,
  SEC_SAVE_USER_ADD,
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
    return state.withMutations((map) => {
      if (data.users) {
        map.setIn(['userlist', 'users'], data.users);
        delete data.users; // eslint-disable-line
      }
      map.mergeDeep({ 'userlist': data });
    });
  },

  [SEC_SAVE_USER_EDIT]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'useredit': { 'user': data } });
  },

  [SEC_SAVE_USER_ADD]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'useradd': { 'user': data } });
  },

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
