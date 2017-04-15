export const WGRP_SAVE_GRPS    = 'WGRP_SAVE_GRPS';
export const WGRP_SAVE_GRP     = 'WGRP_SAVE_GRP';
export const WGRP_SAVE_FILTER  = 'WGRP_SAVE_FILTER';
export const WGRP_CLEAR_SEARCH = 'WGRP_CLEAR_SEARCH';

export const WorkgroupApis = {
  GroupsQuery: 'wgroups-query.do',
  GroupSave: 'wgroup-save.do',
  GroupAdd: 'wgroup-add.do',
  GroupInfo: 'wgroup-info.do'
};

export function groupsSave(grplist) {
  return {
    type: WGRP_SAVE_GRPS,
    data: grplist
  };
}

export function filterSave(filter) {
  return {
    type: WGRP_SAVE_FILTER,
    data: filter
  };
}

export function groupSave(grpinfo) {
  return {
    type: WGRP_SAVE_GRP,
    data: grpinfo
  };
}

export function searchClear(filter) {
  return {
    type: WGRP_CLEAR_SEARCH,
    data: filter
  };
}