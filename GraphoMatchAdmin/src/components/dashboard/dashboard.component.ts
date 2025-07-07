import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, map } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { JobService } from '../../services/job/job.service';
import { Feedback } from '../../models/feedback.model';
import { FeedbackService } from '../../services/feedback/feedback.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardData$!: Observable<any>;
  feedback$!: Observable<Feedback[]>;
  feedbacks: Feedback[] = [];

  constructor(
    private userService: UserService,
    private feedbackService: FeedbackService,
    private jobService: JobService
  ) { }

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
    this.feedback$ = this.feedbackService.getFeedback();
    this.feedback$.subscribe(data => {
      this.feedbacks = data;      
    });
  }

  getUserInitials(userName: string): string {
    if(!userName) {
      return '';
    }
    return userName.split(' ').map(n => n[0]).join('');
  }
}