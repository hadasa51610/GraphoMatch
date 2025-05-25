import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor() {}

  getUserActivityData(): Observable<any[]> {
    return of([
      { name: "Jan", value: 120 },
      { name: "Feb", value: 150 },
      { name: "Mar", value: 180 },
      { name: "Apr", value: 220 },
      { name: "May", value: 280 },
      { name: "Jun", value: 310 },
      { name: "Jul", value: 350 },
    ]).pipe(delay(500))
  }

  getRegionData(): Observable<any[]> {
    return of([
      { name: "North America", value: 35 },
      { name: "Europe", value: 28 },
      { name: "Asia", value: 22 },
      { name: "South America", value: 10 },
      { name: "Africa", value: 5 },
    ]).pipe(delay(500))
  }

  getJobApplicationsData(): Observable<any[]> {
    return of([
      { name: "Software Engineer", applications: 45 },
      { name: "Graphic Designer", applications: 38 },
      { name: "Marketing Manager", applications: 32 },
      { name: "Data Analyst", applications: 28 },
      { name: "Product Manager", applications: 25 },
      { name: "UX/UI Designer", applications: 22 },
    ]).pipe(delay(500))
  }

  getRecentApplicationsData(): Observable<any[]> {
    return of([
      {
        id: 1,
        user: "Emma Johnson",
        date: "2 hours ago",
        jobTitle: "Software Engineer",
        company: "TechCorp Inc.",
        status: "Applied",
        avatar: "/assets/images/avatars/avatar-1.png",
      },
      {
        id: 2,
        user: "Michael Chen",
        date: "5 hours ago",
        jobTitle: "Graphic Designer",
        company: "Creative Studios",
        status: "Interviewing",
        avatar: "/assets/images/avatars/avatar-2.png",
      },
      {
        id: 3,
        user: "Sophia Rodriguez",
        date: "Yesterday",
        jobTitle: "Marketing Manager",
        company: "Brand Solutions",
        status: "Applied",
        avatar: "/assets/images/avatars/avatar-3.png",
      },
      {
        id: 4,
        user: "James Wilson",
        date: "Yesterday",
        jobTitle: "Product Manager",
        company: "InnovateTech",
        status: "Rejected",
        avatar: "/assets/images/avatars/avatar-4.png",
      },
    ]).pipe(delay(500))
  }

  getActivityByTimeData(): Observable<any[]> {
    return of([
      { name: "12am", value: 10 },
      { name: "3am", value: 5 },
      { name: "6am", value: 15 },
      { name: "9am", value: 45 },
      { name: "12pm", value: 60 },
      { name: "3pm", value: 75 },
      { name: "6pm", value: 50 },
      { name: "9pm", value: 30 },
    ]).pipe(delay(500))
  }
}
