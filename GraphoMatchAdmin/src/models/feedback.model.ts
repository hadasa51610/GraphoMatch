import { User } from "./user.model";

export interface Feedback {
  id: string;
  userId: string;
  user: User;
  content: string;
  createdAt: Date;
}