import { Component, type OnInit, ViewChild } from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import { MatSidenav } from "@angular/material/sidenav"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { filter } from "rxjs/operators"
import { AuthService } from "../../services/auth/auth.service"
import { ThemeService } from "../../services/theme/theme.service"
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarHeaderComponent } from "./sidebar-header/sidebar-header.component";
import { MatIcon } from "@angular/material/icon"
import { SidebarNavComponent } from "./sidebar-nav/sidebar-nav.component";
import { HeaderToolbarComponent } from "./header-toolbar/header-toolbar.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input"

@Component({
  selector: "app-dashboard-layout",
  imports: [ MatSidenavModule, SidebarHeaderComponent, MatIcon, SidebarNavComponent,
     HeaderToolbarComponent,MatFormFieldModule,MatInputModule],
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.css"],
})
export class DashboardLayoutComponent implements OnInit {
  @ViewChild("sidenav") sidenav!: MatSidenav

  isMobile = false
  currentUser: any
  isDarkMode = false
  currentRoute = ""

  navItems = [
    { path: "/dashboard", icon: "bar_chart", label: "Dashboard" },
    { path: "/users", icon: "people", label: "User Management" },
    { path: "/jobs", icon: "work", label: "Job Management" },
    { path: "/reports", icon: "psychology", label: "Reports & Statistics" },
    { path: "/settings", icon: "settings", label: "Settings" },
  ]

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.setupResponsiveLayout()
    this.setupRouteTracking()
    this.setupUserAndTheme()
  }

  private setupResponsiveLayout(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches
      if (!this.isMobile && this.sidenav) {
        this.sidenav.open()
      }
    })
  }

  private setupRouteTracking(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.currentRoute = event.url
      if (this.isMobile && this.sidenav) {
        this.sidenav.close()
      }
    })
  }

  private setupUserAndTheme(): void {
    this.currentUser = this.authService.getCurrentUser()
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode()
  }

  logout(): void {
    this.authService.logout()
  }

  isActive(path: string): boolean {
    return this.currentRoute === path
  }
}
