export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: Date;
  lastLogin?: Date;
  analysisCount: number;
}