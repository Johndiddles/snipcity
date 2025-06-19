import { User } from "./user";

export interface Comment {
  author: User;
  comment: string;
  createdAt: string;
  _id: string;
}
