import { Map } from 'immutable';

import {
  WGRP_SAVE_WGRPS,
  WGRP_SAVE_WGRP_ADD,
  WGRP_SAVE_WGRP_EDIT,
} from '../actions/wgroupActions';

const initialState = Map({
  wgrouplist: Map({
    wgroups: [],
    search: '',
    internal: false,
    external: false,
  }),
  wgroupedit: Map({}),
  wgroupadd: Map({}),
});

const actionsMap = {

  // Loader Action
  [WGRP_SAVE_WGRPS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations((map) => {
      if (data.wgroups) {
        map.setIn(['wgrouplist', 'wgroups'], data.wgroups);
        delete data.wgroups; // eslint-disable-line
      }
      map.mergeDeep({ 'wgrouplist': data });
    });
  },

  [WGRP_SAVE_WGRP_ADD]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({
      wgroupadd: data,
    });
  },

  [WGRP_SAVE_WGRP_EDIT]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({
      wgroupedit: data,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
