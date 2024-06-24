export const USER_ROLE = {
  admin: 'admin',
  moderate: 'moderate',
  superAdmin: 'superAdmin',
} as const;

export type TUserRole = keyof typeof USER_ROLE;
