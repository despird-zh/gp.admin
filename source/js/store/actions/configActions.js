
export const CFG_SAVE_PROFILE = 'CFG_SAVE_PROFILE';

export const ConfigApis = {
  EntProfileQuery: 'ent-profile-query.do',
  SysOptsQuery: 'sys-opts-query.do'
};

export function profileSaveAction(profile) {
  return {
    type: CFG_SAVE_PROFILE,
    data: profile
  };
}
