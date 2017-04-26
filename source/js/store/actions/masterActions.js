export const MST_SAVE_STORAGES = 'MST_SAVE_STORAGES';
export const MST_SAVE_DICTS = 'MST_SAVE_DICTS';
export const MST_SAVE_DICTS_FILTER = 'MST_SAVE_DICTS_FILTER';
export const MST_CLEAR_DICTS_FILTER = 'MST_SAVE_DICTS_FILTER';

export const MasterApis = {
  StoragesQuery: 'storages-query.do',
  StorageAdd: 'storage-add.do',
  StorageSave: 'storage-save.do',
  StorageDelete: 'storage-remove.do',
  DictsQuery: 'dicts-query.do',
  DictSave: 'dict-save.do',
};

export function storagesSave(storages) {
  return {
    type: MST_SAVE_STORAGES,
    data: storages,
  };
}

export function saveDicts(dicts) {
  return {
    type: MST_SAVE_DICTS,
    data: dicts,
  };
}

export function saveDictsFilter(filter) {
  return {
    type: MST_SAVE_DICTS_FILTER,
    data: filter,
  };
}

export function clearDictsFilter(filter) {
  return {
    type: MST_CLEAR_DICTS_FILTER,
    data: filter,
  };
}
