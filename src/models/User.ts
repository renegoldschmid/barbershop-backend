import { model, Schema, Model, Document } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Boolean, required: true },
  registrationHash: { type: String, required: true },
  password: { type: String, required: true },
  sessionKeys: [{ type: String, required: true }],
});

interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  active: boolean,
  registrationHash: string,
  password: string,
  sessionKeys?: string[],
};

const User = model<IUser>("User", UserSchema);
export default User;
export {UserSchema, User, IUser}
