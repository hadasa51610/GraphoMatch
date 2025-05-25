import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router"

// Angular Material Imports
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from "@angular/material/list"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatMenuModule } from "@angular/material/menu"
import { MatBadgeModule } from "@angular/material/badge"
import { MatChipsModule } from "@angular/material/chips"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatTabsModule } from "@angular/material/tabs"
import { MatSelectModule } from "@angular/material/select"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

// Chart Module
import { NgxChartsModule } from "@swimlane/ngx-charts"

// Components
import { AppComponent } from "./app.component"
import { JobApplicationsChartComponent } from "./components/dashboard/charts/job-applications-chart/job-applications-chart.component"
import { RegionDistributionChartComponent } from "./components/dashboard/charts/region-distribution-chart/region-distribution-chart.component"
import { ActivityTimeChartComponent } from "./components/dashboard/charts/activity-time-chart/activity-time-chart.component"
import { LoginComponent } from "./components/login/login.component"
import { DashboardComponent } from "./components/dashboard/dashboard.component"
import { DashboardLayoutComponent } from "../shared/dashboard-layout/dashboard-layout.component"
import { SidebarHeaderComponent } from "../shared/dashboard-layout/sidebar-header/sidebar-header.component"
import { SidebarNavComponent } from "../shared/dashboard-layout/sidebar-nav/sidebar-nav.component"
import { HeaderToolbarComponent } from "../shared/dashboard-layout/header-toolbar/header-toolbar.component"
import { DashboardHeaderComponent } from "./components/dashboard/dashboard-header/dashboard-header.component"
import { UserActivityChartComponent } from "./components/dashboard/charts/user-activity-chart/user-activity-chart.component"
import { RecentApplicationsComponent } from "../shared/recent-applications/recent-applications.component"
import { ChartCardComponent } from "../shared/chart-card/chart-card.component"
import { StatCardComponent } from "../shared/stat-card/stat-card.component"
import { AnimatedCounterComponent } from "../shared/animated-counter/animated-counter.component"

// Services
import { AuthService } from "../services/auth/auth.service"
import { ThemeService } from "../services/theme/theme.service"
import { DashboardService } from "../services/dashboard/dashboard.service"
import { NotificationService } from "../services/notification/notification.service"

// Routes
import { routes } from "./app.routes"


@NgModule({
  declarations: [
    // JobManagementComponent,
    // ReportsComponent,
  ],
  imports: [
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    // Standalone Components
    LoginComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    SidebarHeaderComponent,
    SidebarNavComponent,
    HeaderToolbarComponent,
    DashboardHeaderComponent,
    AnimatedCounterComponent,
    StatCardComponent,
    ChartCardComponent,
    RecentApplicationsComponent,
    UserActivityChartComponent,
    ActivityTimeChartComponent,
    RegionDistributionChartComponent,
    JobApplicationsChartComponent,

    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatBadgeModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,

    // Charts
    NgxChartsModule,
  ],
  providers: [AuthService, ThemeService, DashboardService, NotificationService],
//   bootstrap: [AppComponent],
})
export class AppModule {}
