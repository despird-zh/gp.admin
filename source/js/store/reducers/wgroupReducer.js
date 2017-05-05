import { Map, List } from 'immutable';

import {
  WGRP_SAVE_WGRPS,
  WGRP_SAVE_WGRP_ADD,
  WGRP_SAVE_WGRP_EDIT
} from '../actions/wgroupActions';

const initialState = Map({
  wgrplist: Map({
    wgrps: [],
    search: '',
    internal: false,
    external: false,
  }),
  wgrpedit: Map({}),
  wgrpadd: Map({}),
});

const actionsMap = {

  // Loader Action
  [WGRP_SAVE_WGRPS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations( (map) => {
      if(data.wgrps){
        map.setIn(['wgrplist', 'wgrps'], data.wgrps);
        delete data['wgrps'];
      }
      map.mergeDeep({ 'wgrplist': data });
    });
  },

  [WGRP_SAVE_WGRP_ADD]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({
      wgrpadd: data,
    });
  },

  [WGRP_SAVE_WGRP_EDIT]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({
      wgrpedit: data,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
