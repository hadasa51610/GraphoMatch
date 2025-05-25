import { Component, type OnInit } from "@angular/core"
import { DashboardService } from "../../../services/dashboard/dashboard.service"
import { StatCardComponent } from "../../../shared/stat-card/stat-card.component";
import { DashboardLayoutComponent } from "../../../shared/dashboard-layout/dashboard-layout.component";
import { UserActivityChartComponent } from "./charts/user-activity-chart/user-activity-chart.component";
import { ActivityTimeChartComponent } from "./charts/activity-time-chart/activity-time-chart.component";
import { JobApplicationsChartComponent } from "./charts/job-applications-chart/job-applications-chart.component";
import { RecentApplicationsComponent } from "../../../shared/recent-applications/recent-applications.component";
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { Card } from "../../../types/card.type";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  imports: [StatCardComponent, DashboardLayoutComponent, UserActivityChartComponent, ActivityTimeChartComponent, JobApplicationsChartComponent, RecentApplicationsComponent, DashboardHeaderComponent],
})
export class DashboardComponent implements OnInit {
  // Stats data
  statsCards: Card[] = [
    {
      title: "Total Users",
      value: 1254,
      percentChange: 24,
      icon: "people",
      iconColor: "primary",
      previousValue: "vs. previous month",
      chartType: "area",
      gradientStart: "#9c27b0",
      gradientEnd: "#e91e63",
    },
    {
      title: "Job Applications",
      value: 876,
      percentChange: 18,
      icon: "description",
      iconColor: "accent",
      previousValue: "vs. previous month",
      chartType: "line",
      gradientStart: "#e91e63",
      gradientEnd: "#f44336",
    },
    {
      title: "Job Listings",
      value: 237,
      percentChange: 5,
      icon: "work",
      iconColor: "primary",
      previousValue: "new this week",
      chartType: "bar",
      gradientStart: "#673ab7",
      gradientEnd: "#3f51b5",
    },
    {
      title: "Conversion Rate",
      value: 68,
      percentChange: 5,
      icon: "trending_up",
      iconColor: "accent",
      previousValue: "vs. previous month",
      chartType: "line",
      gradientStart: "#3f51b5",
      gradientEnd: "#2196f3",
    },
  ]

  // Chart data
  userActivityData: any[] = []
  regionData: any[] = []
  jobApplicationsData: any[] = []
  recentApplicationsData: any[] = []
  activityByTimeData: any[] = []

  // Loading states
  isLoading = {
    userActivity: true,
    regionData: true,
    jobApplications: true,
    recentApplications: true,
    activityByTime: true,
  }

  // Filter options
  timeFilterOptions = [
    { label: "This Year", value: "year" },
    { label: "This Month", value: "month" },
    { label: "Last 6 Months", value: "6months" },
  ]

  dayFilterOptions = [
    { label: "This Week", value: "week" },
    { label: "Today", value: "today" },
    { label: "This Month", value: "month" },
  ]

  today = new Date()

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData()
  }

  loadDashboardData(): void {
    this.loadUserActivityData()
    this.loadRegionData()
    this.loadJobApplicationsData()
    this.loadRecentApplicationsData()
    this.loadActivityByTimeData()
  }

  loadUserActivityData(): void {
    this.dashboardService.getUserActivityData().subscribe({
      next: (data) => {
        this.userActivityData = this.transformLineChartData(data)
        this.isLoading.userActivity = false
      },
      error: (error) => {
        console.error("Error loading user activity data", error)
        this.isLoading.userActivity = false
      },
    })
  }

  loadRegionData(): void {
    this.dashboardService.getRegionData().subscribe({
      next: (data) => {
        this.regionData = data
        this.isLoading.regionData = false
      },
      error: (error) => {
        console.error("Error loading region data", error)
        this.isLoading.regionData = false
      },
    })
  }

  loadJobApplicationsData(): void {
    this.dashboardService.getJobApplicationsData().subscribe({
      next: (data) => {
        this.jobApplicationsData = data
        this.isLoading.jobApplications = false
      },
      error: (error) => {
        console.error("Error loading job applications data", error)
        this.isLoading.jobApplications = false
      },
    })
  }

  loadRecentApplicationsData(): void {
    this.dashboardService.getRecentApplicationsData().subscribe({
      next: (data) => {
        this.recentApplicationsData = data
        this.isLoading.recentApplications = false
      },
      error: (error) => {
        console.error("Error loading recent applications data", error)
        this.isLoading.recentApplications = false
      },
    })
  }

  loadActivityByTimeData(): void {
    this.dashboardService.getActivityByTimeData().subscribe({
      next: (data) => {
        this.activityByTimeData = this.transformLineChartData(data)
        this.isLoading.activityByTime = false
      },
      error: (error) => {
        console.error("Error loading activity by time data", error)
        this.isLoading.activityByTime = false
      },
    })
  }

  // Transform data for line charts
  private transformLineChartData(data: any[]): any[] {
    return data.map((item) => ({
      name: item.name,
      value: item.value ?? 0,
    }))
  }

  // Get mini chart data for stat cards
  getMiniChartData(data: any[], count = 5): any[] {
    return data.slice(-count).map((item) => ({
      name: item.name,
      value: item.value ?? 0,
    }))
  }
}
