import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  user_provider_id: string;
  username: string;
  email: string;
  authProvider: "google" | "github";
  profileImage?: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    user_provider_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    authProvider: { type: String, enum: ["google", "github"], required: true },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.User ||
  mongoose.model<IUser>("User", userSchema);
