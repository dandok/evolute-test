import { Document, Schema, model } from 'mongoose';
import { EUserType } from '../../@types/appp.enum';

export type TUser = {
  email: string;
  first_name?: string;
  last_name?: string;
  role: EUserType;
};

export interface IUserDocment extends TUser, Document {}
const UsersSchema = new Schema<IUserDocment>(
  {
    email: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: EUserType,
      required: true,
    },
  },
  { timestamps: true }
);
export const UsersModel = model('Users', UsersSchema);
