
export const CFG_SAVE_PROFILE = 'CFG_SAVE_PROFILE';

// Test action

export function profileSaveAction(profile) {
  return {
    type: CFG_SAVE_PROFILE,
    data: profile
  };
}
