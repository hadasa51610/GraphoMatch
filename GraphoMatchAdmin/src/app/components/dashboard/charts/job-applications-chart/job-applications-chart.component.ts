import { Component, Input } from "@angular/core"
import { ChartCardComponent } from "../../../../../shared/chart-card/chart-card.component";

@Component({
  selector: "app-job-applications-chart",
  templateUrl: "./job-applications-chart.component.html",
  styleUrls: ["./job-applications-chart.component.css"],
  imports: [ChartCardComponent],
})
export class JobApplicationsChartComponent {
  @Input() chartData: any[] = []
  @Input() isLoading = true
}
