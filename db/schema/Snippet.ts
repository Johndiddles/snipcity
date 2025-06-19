import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IComment } from "./Comment";

export interface ISnippet extends Document {
  title: string;
  description?: string;
  code: string;
  language: string;
  isPublic: boolean;
  author: IUser["_id"] | IUser;
  comments: IComment["_id"][];
  upvotes: number;
  downvotes: number;
  tags?: string;
}

const snippetSchema: Schema<ISnippet> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    language: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tags: { type: String },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose?.models?.Snippet ||
  mongoose.model<ISnippet>("Snippet", snippetSchema);
