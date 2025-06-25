import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Job } from '../../models/job.model';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  private mockJobs: Job[] = [
    {
      id: '1',
      title: 'Software Developer',
      description: 'Develop and maintain web applications using modern technologies.',
      requirements: ['JavaScript', 'Angular', 'Node.js', 'MongoDB'],
      salaryRange: { min: 60000, max: 90000 },
      location: 'New York, NY',
      type: 'full-time',
      category: 'Technology',
      status: 'active',
      createdAt: new Date('2024-01-10'),
      applications: 25
    },
    {
      id: '2',
      title: 'Marketing Specialist',
      description: 'Create and execute marketing campaigns to drive brand awareness.',
      requirements: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
      salaryRange: { min: 45000, max: 65000 },
      location: 'Los Angeles, CA',
      type: 'full-time',
      category: 'Marketing',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      applications: 18
    },
    {
      id: '3',
      title: 'Data Analyst',
      description: 'Analyze data to provide insights for business decisions.',
      requirements: ['Python', 'SQL', 'Tableau', 'Statistics'],
      salaryRange: { min: 55000, max: 75000 },
      location: 'Remote',
      type: 'remote',
      category: 'Data Science',
      status: 'active',
      createdAt: new Date('2024-01-20'),
      applications: 32
    },
    {
      id: '4',
      title: 'Project Manager',
      description: 'Lead cross-functional teams to deliver projects on time and budget.',
      requirements: ['PMP Certification', 'Agile', 'Leadership', 'Communication'],
      salaryRange: { min: 70000, max: 95000 },
      location: 'Chicago, IL',
      type: 'full-time',
      category: 'Management',
      status: 'inactive',
      createdAt: new Date('2024-01-25'),
      applications: 12
    }
  ];

  private jobsSubject = new BehaviorSubject<Job[]>(this.mockJobs);
  public jobs$ = this.jobsSubject.asObservable();

  constructor() { }

  getJobs(): Observable<Job[]> {
    return this.jobs$;
  }

  getJobById(id: string): Observable<Job | undefined> {
    return of(this.mockJobs.find(job => job.id === id));
  }

  createJob(job: Omit<Job, 'id' | 'createdAt' | 'applications'>): Observable<Job> {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date(),
      applications: 0
    };
    this.mockJobs.push(newJob);
    this.jobsSubject.next([...this.mockJobs]);
    return of(newJob);
  }

  updateJob(updatedJob: Job): Observable<Job> {
    const index = this.mockJobs.findIndex(job => job.id === updatedJob.id);
    if (index !== -1) {
      this.mockJobs[index] = updatedJob;
      this.jobsSubject.next([...this.mockJobs]);
    }
    return of(updatedJob);
  }

  deleteJob(id: string): Observable<boolean> {
    const index = this.mockJobs.findIndex(job => job.id === id);
    if (index !== -1) {
      this.mockJobs.splice(index, 1);
      this.jobsSubject.next([...this.mockJobs]);
      return of(true);
    }
    return of(false);
  }

  getJobStats(): Observable<any> {
    const totalJobs = this.mockJobs.length;
    const activeJobs = this.mockJobs.filter(job => job.status === 'active').length;
    const totalApplications = this.mockJobs.reduce((sum, job) => sum + job.applications, 0);
    
    return of({
      totalJobs,
      activeJobs,
      inactiveJobs: totalJobs - activeJobs,
      totalApplications,
      averageApplicationsPerJob: Math.round(totalApplications / totalJobs)
    });
  }
}