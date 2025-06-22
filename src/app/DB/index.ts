import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superAdmin = {
  email: 'arifibnenam@gmail.com',
  // password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
  authType: 'gmail',
  fullName: 'Super Admin',
};

export const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};
