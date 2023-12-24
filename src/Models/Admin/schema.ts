import { Schema, model } from 'mongoose';

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const AdminModel = model('Admin', AdminSchema);
