export const WGRP_SAVE_GRPS    = 'WGRP_SAVE_GRPS';
export const WGRP_SAVE_GRP     = 'WGRP_SAVE_GRP';
export const WGRP_SAVE_FILTER  = 'WGRP_SAVE_FILTER';
export const WGRP_CLEAR_SEARCH = 'WGRP_CLEAR_SEARCH';


export function groupsSaveAction(grplist) {
  return {
    type: WGRP_SAVE_GRPS,
    data: grplist
  };
}

export function filterSaveAction(filter) {
  return {
    type: WGRP_SAVE_FILTER,
    data: filter
  };
}

export function groupSaveAction(grpinfo) {
  return {
    type: WGRP_SAVE_GRP,
    data: grpinfo
  };
}

export function searchClearAction(filter) {
  return {
    type: WGRP_CLEAR_SEARCH,
    data: filter
  };
}