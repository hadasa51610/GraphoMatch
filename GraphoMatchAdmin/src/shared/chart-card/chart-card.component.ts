import { Component, Input } from "@angular/core"
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSpinner } from "@angular/material/progress-spinner";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-chart-card",
  templateUrl: "./chart-card.component.html",
  styleUrls: ["./chart-card.component.css"],
  imports:[ CommonModule, MatCardModule,MatSelectModule,MatOptionModule,MatSpinner,
    NgxChartsModule,MatInputModule],
})
export class ChartCardComponent {
  @Input() title = ""
  @Input() subtitle = ""
  @Input() chartData: any[] = []
  @Input() chartType: "line" | "bar" | "area" | "pie" | "vertical-bar" = "line"
  @Input() showLegend = false
  @Input() legendPosition: LegendPosition = LegendPosition.Below
  @Input() colorScheme: any = {
    domain: ["#9c27b0", "#e91e63", "#3f51b5", "#2196f3", "#00bcd4"],
  }
  @Input() gradient = true
  @Input() xAxisLabel = ""
  @Input() yAxisLabel = ""
  @Input() showXAxis = true
  @Input() showYAxis = true
  @Input() showXAxisLabel = false
  @Input() showYAxisLabel = false
  @Input() autoScale = true
  @Input() roundEdges = true
  @Input() animations = true
  @Input() scheme = "cool"
  @Input() filterData: any[] = []
  @Input() showFilter = false
  @Input() selectedFilter = ""
  @Input() isLoading = false

  onFilterChange(event: any): void {
    // Emit event to parent component
    console.log("Filter changed:", event.value)
  }

  onSelect(event: any): void {
    console.log("Item clicked", event)
  }
}
