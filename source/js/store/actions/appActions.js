import API from '../../rpcapi';

export const APP_SHOW_LOADER = 'APP_SHOW_LOADER';
export const APP_SHOW_SNACK  = 'APP_SHOW_SNACK';
export const APP_ONLY_SNACK  = 'APP_ONLY_SNACK';
// Test action

export function loaderAction({shown = true, loaderTip = null}) {
  return {
    type: APP_SHOW_LOADER,
    data: {
      shown: shown,
      tip: loaderTip,
    }
  };
}

export function snackAction({shown = true, snackTip = null}) {
  return {
    type: APP_SHOW_SNACK,
    data: {
      shown: shown,
      tip: snackTip,
    },
  };
}

export function snackOnlyAction({shown = true, snackTip = null}) {
  return {
    type: APP_ONLY_SNACK,
    data: {
      shown: shown,
      tip: snackTip,
    },
  };
}