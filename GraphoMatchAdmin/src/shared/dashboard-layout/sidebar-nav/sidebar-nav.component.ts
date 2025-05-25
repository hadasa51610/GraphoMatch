import { Component, Input, Output, EventEmitter } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { MatNavList } from "@angular/material/list"
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-sidebar-nav",
  imports: [MatIcon, MatNavList, CommonModule, RouterModule],
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.css"],
})
export class SidebarNavComponent {
  @Input() navItems: any[] = []
  @Input() currentRoute = ""
  @Output() logoutClicked = new EventEmitter<void>()

  isActive(path: string): boolean {
    return this.currentRoute === path
  }

  onLogout(): void {
    this.logoutClicked.emit()
  }
}
