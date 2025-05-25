import { Component, Input } from "@angular/core"
import { ChartCardComponent } from "../../../../../shared/chart-card/chart-card.component";

@Component({
  selector: "app-user-activity-chart",
  templateUrl: "./user-activity-chart.component.html",
  styleUrls: ["./user-activity-chart.component.css"],
  imports: [ChartCardComponent],
})
export class UserActivityChartComponent {
  @Input() chartData: any[] = []
  @Input() isLoading = true
  @Input() filterOptions: any[] = []

  selectedFilter = "year"

  get formattedChartData() {
    return [
      {
        name: "Users",
        series: this.chartData,
      },
    ]
  }

  onFilterChange(event: any): void {
    this.selectedFilter = event.value
    // Implement filter logic here
  }
}
