
export const APP_SHOW_LOADER = 'APP_SHOW_LOADER';
export const APP_SHOW_SNACK = 'APP_SHOW_SNACK';
export const APP_ONLY_SNACK = 'APP_ONLY_SNACK';

export const AppApis = {
  StoragesQuery: 'storages-query.do',
  AvailUsersQuery: 'common-avail-user-list.do',
  UsersQuery: 'common-user-list.do',
  OrgNodesQuery: 'common-org-nodes.do',
};

export function loaderAction({ shown = true, loaderTip = '' }) {
  return {
    type: APP_SHOW_LOADER,
    data: {
      shown,
      tip: loaderTip,
    },
  };
}

export function snackAction({ shown = true, snackTip = '' }) {
  return {
    type: APP_SHOW_SNACK,
    data: {
      shown,
      tip: snackTip,
    },
  };
}

export function snackOnlyAction({ shown = true, snackTip = '' }) {
  return {
    type: APP_ONLY_SNACK,
    data: {
      shown,
      tip: snackTip,
    },
  };
}
