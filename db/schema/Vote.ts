import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { ISnippet } from "./Snippet";

export interface IVote extends Document {
  snippet: ISnippet["_id"];
  user: IUser["_id"] | IUser;
  voteType: "upvote" | "downvote" | null;
}

const voteSchema: Schema<IVote> = new Schema(
  {
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Vote ||
  mongoose.model<IVote>("Vote", voteSchema);
