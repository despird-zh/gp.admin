export const MST_SAVE_STORAGES = 'MST_SAVE_STORAGES';
export const MST_SAVE_IMAGES = 'MST_SAVE_IMAGES';
export const MST_SAVE_DICTS = 'MST_SAVE_DICTS';
export const MST_SAVE_ENTITIES = 'MST_SAVE_ENTITIES';
export const MST_SAVE_ORGHIER = 'MST_SAVE_ORGHIER';

export const MasterApis = {
  StoragesQuery: 'storages-query.do',
  StorageAdd: 'storage-add.do',
  StorageSave: 'storage-save.do',
  StorageRemove: 'storage-remove.do',

  ImagesQuery: 'images-query.do',
  ImageAdd: 'image-add.do',
  ImageSave: 'image-save.do',
  ImageRemove: 'image-remove.do',

  DictsQuery: 'dicts-query.do',
  DictSave: 'dict-save.do',
  EntitiesQuery: 'entities-query.do',
  EntitySave: 'entity-save.do',

  OrgHierQuery: 'org-hier-query.do',
  OrgNodeSave: 'org-node-save.do',
  OrgNodeAdd: 'org-node-add.do',
  OrgMembersQuery: 'org-members-query.do',
  OrgMemberRemove: 'org-member-remove.do',
};

export function saveStorages(storages) {
  return {
    type: MST_SAVE_STORAGES,
    data: storages,
  };
}

export function saveImages(storages) {
  return {
    type: MST_SAVE_IMAGES,
    data: storages,
  };
}

export function saveDicts(dicts) {
  return {
    type: MST_SAVE_DICTS,
    data: dicts,
  };
}

export function saveEntities(dicts) {
  return {
    type: MST_SAVE_ENTITIES,
    data: dicts,
  };
}

export function saveOrgHier(orghier) {
  return {
    type: MST_SAVE_ORGHIER,
    data: orghier,
  };
}
