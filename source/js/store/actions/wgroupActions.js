export const WGRP_SAVE_WGRPS = 'WGRP_SAVE_WGRPS';
export const WGRP_SAVE_WGRP_ADD = 'WGRP_SAVE_WGRP_ADD';
export const WGRP_SAVE_WGRP_EDIT = 'WGRP_SAVE_WGRP_EDIT';

export const WorkgroupApis = {
  GroupsQuery: 'wgroups-query.do',
  GroupSave: 'wgroup-save.do',
  GroupAdd: 'wgroup-add.do',
  GroupInfo: 'wgroup-info.do',
};

export function saveWGroups(grouplist) {
  return {
    type: WGRP_SAVE_WGRPS,
    data: grouplist,
  };
}

export function saveWGroupAdd(grpinfo) {
  return {
    type: WGRP_SAVE_WGRP_ADD,
    data: grpinfo,
  };
}

export function saveWGroupEdit(grpinfo) {
  return {
    type: WGRP_SAVE_WGRP_EDIT,
    data: grpinfo,
  };
}
