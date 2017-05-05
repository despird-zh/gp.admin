export const MST_SAVE_STORAGES = 'MST_SAVE_STORAGES';
export const MST_SAVE_STORAGES_FILTER = 'MST_SAVE_STORAGES_FILTER';
export const MST_SAVE_IMAGES = 'MST_SAVE_IMAGES';
export const MST_SAVE_IMAGES_FILTER = 'MST_SAVE_IMAGES_FILTER';
export const MST_SAVE_DICTS = 'MST_SAVE_DICTS';
export const MST_SAVE_DICTS_FILTER = 'MST_SAVE_DICTS_FILTER';
export const MST_SAVE_ENTITIES = 'MST_SAVE_ENTITIES';
export const MST_SAVE_ENTITIES_FILTER = 'MST_SAVE_ENTITIES_FILTER';
export const MST_SAVE_ORGHIER = 'MST_SAVE_ORGHIER';

export const MasterApis = {
  StoragesQuery: 'storages-query.do',
  StorageAdd: 'storage-add.do',
  StorageSave: 'storage-save.do',
  StorageDelete: 'storage-remove.do',

  ImagesQuery: 'images-query.do',
  ImageAdd: 'image-add.do',
  ImageSave: 'image-save.do',
  ImageDelete: 'image-remove.do',

  DictsQuery: 'dicts-query.do',
  DictSave: 'dict-save.do',
  EntitiesQuery: 'entities-query.do',
  EntitySave: 'entity-save.do',

  OrgHierQuery: 'org-hier-query.do',
  OrgMembersQuery: 'org-members-query.do',
  OrgMemberRemove: 'org-member-remove.do',
};

export function saveStorages(storages) {
  return {
    type: MST_SAVE_STORAGES,
    data: storages,
  };
}

export function saveStoragesFilter(filter) {
  return {
    type: MST_SAVE_STORAGES_FILTER,
    data: filter,
  };
}

export function saveImages(storages) {
  return {
    type: MST_SAVE_IMAGES,
    data: storages,
  };
}

export function saveImagesFilter(filter) {
  return {
    type: MST_SAVE_IMAGES_FILTER,
    data: filter,
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

export function saveEntities(dicts) {
  return {
    type: MST_SAVE_ENTITIES,
    data: dicts,
  };
}

export function saveEntitiesFilter(filter) {
  return {
    type: MST_SAVE_ENTITIES_FILTER,
    data: filter,
  };
}

export function saveOrgHier(orghier) {
  return {
    type: MST_SAVE_ORGHIER,
    data: orghier,
  };
}