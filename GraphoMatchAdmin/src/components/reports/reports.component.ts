import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, map } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { JobService } from '../../services/job/job.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('userChart', { static: true }) userChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('jobChart', { static: true }) jobChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trendChart', { static: true }) trendChartRef!: ElementRef<HTMLCanvasElement>;

  reportData$!: Observable<any>;
  private userChart!: Chart;
  private jobChart!: Chart;
  private trendChart!: Chart;

  constructor(
    private userService: UserService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.reportData$ = combineLatest([
      this.userService.getUserStats(),
      this.jobService.getJobStats()
    ]).pipe(
      map(([userStats, jobStats]: [any, any]) => ({
        ...userStats,
        ...jobStats
      }))
    );
  }

  ngAfterViewInit(): void {
    this.reportData$.subscribe(data => {
      this.createUserChart(data);
      this.createJobChart(data);
      this.createTrendChart();
    });
  }

  private createUserChart(data: any): void {
    const ctx = this.userChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.userChart) {
      this.userChart.destroy();
    }

    this.userChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [{
          data: [data.activeUsers, data.inactiveUsers],
          backgroundColor: [
            'rgba(102, 126, 234, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderColor: [
            'rgba(102, 126, 234, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(102, 126, 234, 0.5)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true
          }
        },
        cutout: '60%',
        animation: {
          animateRotate: true,
          duration: 2000
        }
      }
    });
  }

  private createJobChart(data: any): void {
    const ctx = this.jobChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.jobChart) {
      this.jobChart.destroy();
    }

    this.jobChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Active Jobs', 'Inactive Jobs'],
        datasets: [{
          data: [data.activeJobs, data.inactiveJobs],
          backgroundColor: [
            'rgba(240, 147, 251, 0.8)',
            'rgba(245, 158, 11, 0.8)'
          ],
          borderColor: [
            'rgba(240, 147, 251, 1)',
            'rgba(245, 158, 11, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(240, 147, 251, 0.5)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true
          }
        },
        animation: {
          animateRotate: true,
          duration: 2000
        }
      }
    });
  }

  private createTrendChart(): void {
    const ctx = this.trendChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.trendChart) {
      this.trendChart.destroy();
    }

    // Mock data for trend analysis
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const analysesData = [45, 52, 48, 61, 55, 67, 73, 69, 78, 82, 88, 95];
    const applicationsData = [23, 29, 31, 37, 42, 48, 52, 58, 61, 67, 72, 78];

    this.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Handwriting Analyses',
            data: analysesData,
            borderColor: 'rgba(102, 126, 234, 1)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(102, 126, 234, 1)',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Job Applications',
            data: applicationsData,
            borderColor: 'rgba(67, 233, 123, 1)',
            backgroundColor: 'rgba(67, 233, 123, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(67, 233, 123, 1)',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 14,
                weight: 600
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(102, 126, 234, 0.5)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12,
                weight: 500
              },
              color: '#64748b'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(226, 232, 240, 0.5)'
            },
            ticks: {
              font: {
                size: 12,
                weight: 500
              },
              color: '#64748b'
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userChart) {
      this.userChart.destroy();
    }
    if (this.jobChart) {
      this.jobChart.destroy();
    }
    if (this.trendChart) {
      this.trendChart.destroy();
    }
  }
}