import { Component, Input } from "@angular/core"
import { ChartCardComponent } from "../../../../../shared/chart-card/chart-card.component";

@Component({
  selector: "app-activity-time-chart",
  templateUrl: "./activity-time-chart.component.html",
  styleUrls: ["./activity-time-chart.component.css"],
  imports: [ChartCardComponent],
})
export class ActivityTimeChartComponent {
  @Input() chartData: any[] = []
  @Input() isLoading = true
  @Input() filterOptions: any[] = []

  selectedFilter = "week"

  get formattedChartData() {
    return [
      {
        name: "Activity",
        series: this.chartData,
      },
    ]
  }

  onFilterChange(event: any): void {
    this.selectedFilter = event.value
    // Implement filter logic here
  }
}
