export const SEC_SAVE_USERS = 'SEC_SAVE_USERS';
export const SEC_SAVE_USER_EDIT = 'SEC_SAVE_USER_EDIT';
export const SEC_SAVE_USER_ADD = 'SEC_SAVE_USER_ADD';

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

export function saveUserEdit(userinfo) {
  return {
    type: SEC_SAVE_USER_EDIT,
    data: userinfo,
  };
}

export function saveUserAdd(userinfo) {
  return {
    type: SEC_SAVE_USER_ADD,
    data: userinfo,
  };
}
