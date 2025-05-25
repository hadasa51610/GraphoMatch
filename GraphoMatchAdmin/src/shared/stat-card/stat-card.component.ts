import { Component, Input } from "@angular/core"
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon"
import { MatCard ,MatCardContent} from "@angular/material/card"
import { MatSpinner } from "@angular/material/progress-spinner"
import { AnimatedCounterComponent } from "../animated-counter/animated-counter.component";


@Component({
  selector: "app-stat-card",
  imports: [NgxChartsModule, CommonModule, MatIcon, MatCard, MatCardContent, MatSpinner, AnimatedCounterComponent],
  templateUrl: "./stat-card.component.html",
  styleUrls: ["./stat-card.component.css"],
})
export class StatCardComponent {
  @Input() title = ""
  @Input() value = 0
  @Input() percentChange = 0
  @Input() icon = ""
  @Input() iconColor = "primary"
  @Input() chartData: any[] = []
  @Input() chartType: "line" | "bar" | "area" = "line" 
  @Input() previousValue = ""
  @Input() gradientStart = "#9c27b0"
  @Input() gradientEnd = "#e91e63"
  @Input() isLoading = false

  get isPositiveChange(): boolean {
    return this.percentChange >= 0
  }

  get formattedPercentChange(): string {
    return `${this.isPositiveChange ? "+" : ""}${this.percentChange}%`
  }

  get chartOptions(): any {
    return {
      animations: true,
      showXAxis: false,
      showYAxis: false,
      showLegend: false,
      showXAxisLabel: false,
      showYAxisLabel: false,
      gradient: true,
      colorScheme: {
        domain: [this.gradientStart],
      },
    }
  }
}
