import mongoose, { Document, Schema } from "mongoose";
import { ISnippet } from "./Snippet";
import { IUser } from "./User";

export interface IComment extends Document {
  snippet: ISnippet["_id"];
  author: IUser["_id"] | IUser;
  comment: string;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

commentSchema.pre(
  /^find/,
  function (this: mongoose.Query<IComment[], IComment>, next) {
    this.populate("author");
    next();
  }
);

export default mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", commentSchema);
