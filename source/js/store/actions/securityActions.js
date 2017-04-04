export const SEC_SAVE_USERS = 'SEC_SAVE_USERS';
export const SEC_SAVE_USER = 'SEC_SAVE_USER';
export const SEC_SAVE_USER_MODE = 'SEC_SAVE_USER_MODE';
export const SEC_SAVE_FILTER = 'SEC_SAVE_FILTER';
export const SEC_CLEAR_SEARCH = 'SEC_CLEAR_SEARCH';

export const SecurityApis = {
  UsersQuery: 'users-query.do',
  UserSave: 'user-save.do',
  UserAdd: 'user-add.do',
  UserInfo: 'user-info.do'
};

export function usersSaveAction(userlist) {
  return {
    type: SEC_SAVE_USERS,
    data: userlist
  };
}

export function filterSaveAction(filter) {
  return {
    type: SEC_SAVE_FILTER,
    data: filter
  };
}

export function userModeSaveAction(mode) {
  return {
    type: SEC_SAVE_USER_MODE,
    data: mode
  };
}

export function userSaveAction(userinfo) {
  return {
    type: SEC_SAVE_USER,
    data: userinfo
  };
}

export function searchClearAction(filter) {
  return {
    type: SEC_CLEAR_SEARCH,
    data: filter
  };
}