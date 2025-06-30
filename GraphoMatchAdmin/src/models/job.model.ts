import { User } from "./user.model";

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  posted: Date;
  tags: string[];
  salary: string;
  seekers: User[] | null;
}