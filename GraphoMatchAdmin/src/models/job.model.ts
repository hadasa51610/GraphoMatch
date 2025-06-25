export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  category: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  applications: number;
}