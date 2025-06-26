import { Comment } from "./comment";

export type Snippet = {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  isPublic: boolean;
  author: {
    _id: string;
    username: string;
    email: string;
    profileImage: string;
  };
  comments: Comment[];
  upvotes: number;
  downvotes: number;
  userVote: "upvote" | "downvote" | null;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
