import { Component, Input } from "@angular/core"
import { CommonModule } from '@angular/common';


@Component({
  selector: "app-dashboard-header",
  templateUrl: "./dashboard-header.component.html",
  styleUrls: ["./dashboard-header.component.css"],
  imports: [CommonModule],
})
export class DashboardHeaderComponent {
  @Input() title = ""
  @Input() date: Date = new Date()
}
