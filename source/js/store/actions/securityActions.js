export const SEC_SAVE_USERS = 'SEC_SAVE_USERS';
export const SEC_SAVE_USERS_FILTER = 'SEC_SAVE_USERS_FILTER';
export const SEC_CLEAR_USERS_FILTER = 'SEC_CLEAR_USERS_FILTER';
export const SEC_SAVE_EDIT_USER = 'SEC_SAVE_EDIT_USER';
export const SEC_SAVE_ADD_USER = 'SEC_SAVE_ADD_USER';

export const SecurityApis = {
  UsersQuery: 'users-query.do',
  UserSave: 'user-save.do',
  UserAdd: 'user-add.do',
  UserInfo: 'user-info.do',
};

export function saveUsers(userlist) {
  return {
    type: SEC_SAVE_USERS,
    data: userlist,
  };
}

export function saveUsersFilter(filter) {
  return {
    type: SEC_SAVE_USERS_FILTER,
    data: filter,
  };
}

export function saveEditUser(userinfo) {
  return {
    type: SEC_SAVE_EDIT_USER,
    data: userinfo,
  };
}

export function saveAddUser(userinfo) {
  return {
    type: SEC_SAVE_ADD_USER,
    data: userinfo,
  };
}

export function clearUsersFilter(filter) {
  return {
    type: SEC_CLEAR_USERS_FILTER,
    data: filter,
  };
}
