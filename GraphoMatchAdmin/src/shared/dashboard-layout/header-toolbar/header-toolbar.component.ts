import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from "@angular/material/divider";
import { MatMenu } from "@angular/material/menu";
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: "app-header-toolbar",
  templateUrl: "./header-toolbar.component.html",
  styleUrls: ["./header-toolbar.component.css"],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatDivider, MatMenu, MatBadgeModule, MatButtonModule, MatDividerModule, MatMenuModule],
})
export class HeaderToolbarComponent {
  @Input() isMobile = false
  @Input() currentRoute = ""
  @Input() isDarkMode = false
  @Input() currentUser: any

  @Output() menuToggle = new EventEmitter<void>()
  @Output() themeToggle = new EventEmitter<void>()
  @Output() logoutClicked = new EventEmitter<void>()

  getPageTitle(): string {
    switch (this.currentRoute) {
      case "/dashboard":
        return "Dashboard"
      case "/users":
        return "User Management"
      case "/jobs":
        return "Job Management"
      case "/reports":
        return "Reports & Statistics"
      case "/settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  onMenuToggle(): void {
    this.menuToggle.emit()
  }

  onThemeToggle(): void {
    this.themeToggle.emit()
  }

  onLogout(): void {
    this.logoutClicked.emit()
  }
}
