import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, map } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { JobService } from '../../services/job/job.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardData$!: Observable<any>;

  constructor(
    private userService: UserService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.dashboardData$ = combineLatest([
      this.userService.getUserStats(),
      this.jobService.getJobStats()
    ]).pipe(
      map(([userStats, jobStats]) => ({
        ...userStats,
        ...jobStats        
      }))
    );
  }
}