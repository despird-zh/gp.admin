import { Map, List } from 'immutable';

import {
  WGRP_SAVE_GRPS, WGRP_SAVE_GRP, WGRP_SAVE_FILTER, WGRP_CLEAR_SEARCH,
} from '../actions/wgroupActions';

const initialState = Map({
  grouplist: Map({
    groups: List(),
    search: '',
    internal: false,
    external: false,
  }),
  groupedit: Map(),
});

const actionsMap = {

  // Loader Action
  [WGRP_SAVE_GRPS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['grouplist', 'groups'], data);
  },
  [WGRP_SAVE_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({
      grouplist: data,
    });
  },
// Loader Action
  [WGRP_SAVE_GRP]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({
      groupedit: data,
    });
  },

  [WGRP_CLEAR_SEARCH]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    const newState = state.mergeDeep({
      grouplist: data,
    });
    return newState.setIn(['grouplist', 'groups'], List());
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
