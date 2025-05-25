import { Component, Input } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { MatCard ,MatCardActions,MatCardContent,MatCardHeader,MatCardSubtitle,MatCardTitle} from "@angular/material/card"
import { MatSpinner } from "@angular/material/progress-spinner"
import { CommonModule } from "@angular/common"


@Component({
  selector: "app-recent-applications",
  imports: [MatIcon, MatCard,MatCardActions,MatCardContent,MatCardHeader,MatCardSubtitle,MatCardTitle,MatSpinner, CommonModule],
  templateUrl: "./recent-applications.component.html",
  styleUrls: ["./recent-applications.component.css"],
})
export class RecentApplicationsComponent {
  @Input() applications: any[] = []
  @Input() showViewAll = true
  @Input() isLoading = false

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "applied":
        return "status-applied"
      case "interviewing":
        return "status-interviewing"
      case "rejected":
        return "status-rejected"
      default:
        return "status-default"
    }
  }
}
