export const MST_SAVE_STORAGES = 'MST_SAVE_STORAGES';

export const MasterApis = {
  UsersQuery: 'storages-query.do',
};

export function storagesSaveAction(storages) {
  return {
    type: MST_SAVE_STORAGES,
    data: storages
  };
}