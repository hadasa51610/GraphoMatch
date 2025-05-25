import type { Routes } from "@angular/router"
import { LoginComponent } from "./components/login/login.component"
import { DashboardComponent } from "./components/dashboard/dashboard.component"
import { AuthGuard } from "../guards/auth.guard"

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
//   {
//     path: "users",
//     component: UserManagementComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: "jobs",
//     component: JobManagementComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: "reports",
//     component: ReportsComponent,
//     canActivate: [AuthGuard],
//   },
  { path: "**", redirectTo: "/login" },
]
