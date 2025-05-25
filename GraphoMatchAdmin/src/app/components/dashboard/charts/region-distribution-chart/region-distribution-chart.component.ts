import { Component, Input } from "@angular/core"
import { ChartCardComponent } from "../../../../../shared/chart-card/chart-card.component";

@Component({
  selector: "app-region-distribution-chart",
  templateUrl: "./region-distribution-chart.component.html",
  styleUrls: ["./region-distribution-chart.component.css"],
  imports: [ChartCardComponent],
})
export class RegionDistributionChartComponent {
  @Input() chartData: any[] = []
  @Input() isLoading = true
}
