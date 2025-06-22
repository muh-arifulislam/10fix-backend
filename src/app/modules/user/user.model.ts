import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    authType: {
      type: String,
      enum: ['gmail', 'email-password'],
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'moderate', 'superAdmin'],
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

export const User = model<IUser, UserModel>('User', userSchema);
