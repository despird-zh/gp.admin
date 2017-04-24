
export const APP_SHOW_LOADER = 'APP_SHOW_LOADER';
export const APP_SHOW_SNACK  = 'APP_SHOW_SNACK';
export const APP_ONLY_SNACK  = 'APP_ONLY_SNACK';
export const CMN_FETCH_STORAGES = 'CMN_FETCH_STORAGES';

export const AppApis = {
  StoragesQuery: 'storages-query.do',
  AvailUsersQuery: 'common-avail-user-list.do',
  UsersQuery: 'common-user-list.do',
};

export function storagesSaveAction(storages) {
  return {
    type: CMN_FETCH_STORAGES,
    data: storages
  };
}

export function loaderAction({shown = true, loaderTip = ''}) {
  return {
    type: APP_SHOW_LOADER,
    data: {
      shown: shown,
      tip: loaderTip,
    }
  };
}

export function snackAction({shown = true, snackTip = ''}) {
  return {
    type: APP_SHOW_SNACK,
    data: {
      shown: shown,
      tip: snackTip,
    },
  };
}

export function snackOnlyAction({shown = true, snackTip = ''}) {
  return {
    type: APP_ONLY_SNACK,
    data: {
      shown: shown,
      tip: snackTip,
    },
  };
}