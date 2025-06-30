import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, switchMap, forkJoin } from 'rxjs';
import { Job } from '../../models/job.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  private baseURL = 'https://localhost:7134/api/Job';
  // private mockJobs: Job[] = [
  //   {
  //     id: '1',
  //     title: 'Software Developer',
  //     description: 'Develop and maintain web applications using modern technologies.',
  //     requirements: ['JavaScript', 'Angular', 'Node.js', 'MongoDB'],
  //     salaryRange: { min: 60000, max: 90000 },
  //     location: 'New York, NY',
  //     type: 'full-time',
  //     category: 'Technology',
  //     status: 'active',
  //     createdAt: new Date('2024-01-10'),
  //     applications: 25
  //   },
  //   {
  //     id: '2',
  //     title: 'Marketing Specialist',
  //     description: 'Create and execute marketing campaigns to drive brand awareness.',
  //     requirements: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
  //     salaryRange: { min: 45000, max: 65000 },
  //     location: 'Los Angeles, CA',
  //     type: 'full-time',
  //     category: 'Marketing',
  //     status: 'active',
  //     createdAt: new Date('2024-01-15'),
  //     applications: 18
  //   },
  //   {
  //     id: '3',
  //     title: 'Data Analyst',
  //     description: 'Analyze data to provide insights for business decisions.',
  //     requirements: ['Python', 'SQL', 'Tableau', 'Statistics'],
  //     salaryRange: { min: 55000, max: 75000 },
  //     location: 'Remote',
  //     type: 'remote',
  //     category: 'Data Science',
  //     status: 'active',
  //     createdAt: new Date('2024-01-20'),
  //     applications: 32
  //   },
  //   {
  //     id: '4',
  //     title: 'Project Manager',
  //     description: 'Lead cross-functional teams to deliver projects on time and budget.',
  //     requirements: ['PMP Certification', 'Agile', 'Leadership', 'Communication'],
  //     salaryRange: { min: 70000, max: 95000 },
  //     location: 'Chicago, IL',
  //     type: 'full-time',
  //     category: 'Management',
  //     status: 'inactive',
  //     createdAt: new Date('2024-01-25'),
  //     applications: 12
  //   }
  // ];

  private jobsSubject = new BehaviorSubject<Job[]>([]);
  public jobs$ = this.jobsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getJobs().subscribe(jobs => this.jobsSubject.next(jobs));
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseURL}/withSeekers`).pipe(
      tap(jobs => this.jobsSubject.next(jobs))
    );
  }

  getJobById(id: string): Observable<Job | undefined> {
    return this.http.get<Job>(`${this.baseURL}/${id}`);
  }

  createJob(job: Omit<Job, 'id' | 'posted'>): Observable<Job> {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      posted: new Date(),
      seekers: [] as User[]
    };
    return this.http.post<Job>(`${this.baseURL}`, newJob).pipe(
      tap(() => this.getJobs().subscribe(jobs => this.jobsSubject.next(jobs)))
    );
  }

  updateJob(updatedJob: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseURL}/${updatedJob.id}`, updatedJob).pipe(
      tap(() => this.getJobs().subscribe(jobs => this.jobsSubject.next(jobs)))
    );
  }

  deleteJob(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURL}/${id}`).pipe(
      tap(() => this.getJobs().subscribe(jobs => this.jobsSubject.next(jobs)))
    );
  }

  getJobStats(): Observable<any> {
    return this.getJobs().pipe(
      tap(jobs => this.jobsSubject.next(jobs)),
      map(jobs => {
        const totalJobs = jobs.length;
        const totalApplications = jobs.reduce((sum, job) => sum + (job.seekers || []).length, 0);
        return {
          totalJobs,
          totalApplications,
          averageApplicationsPerJob: totalJobs > 0 ? Math.round(totalApplications / totalJobs) : 0
        };
      })
    );
  }
}