export const MST_SAVE_STORAGES = 'MST_SAVE_STORAGES';
export const MST_SAVE_DICTS = 'MST_SAVE_DICTS';

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

export function dictsSave(dicts) {
  return {
    type: MST_SAVE_DICTS,
    data: dicts,
  };
}
