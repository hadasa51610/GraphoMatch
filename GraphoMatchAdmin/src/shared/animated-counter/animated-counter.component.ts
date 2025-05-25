import { Component, Input, type OnInit, type OnChanges, type SimpleChanges } from "@angular/core"

@Component({
  selector: "app-animated-counter",
  template: `<span>{{ displayValue }}</span>`,
})
export class AnimatedCounterComponent implements OnInit, OnChanges {
  @Input() value = 0
  @Input() duration = 2000
  @Input() useComma = false

  displayValue = "0"
  private animationFrameId: number | null = null
  private startTime: number | null = null
  private startValue = 0

  ngOnInit(): void {
    this.startAnimation()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"]) {
      this.startAnimation()
    }
  }

  private startAnimation(): void {
    // Cancel any existing animation
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }

    this.startValue = Number.parseInt(this.displayValue.replace(/,/g, ""))
    this.startTime = null

    const animate = (timestamp: number) => {
      if (!this.startTime) {
        this.startTime = timestamp
      }

      const elapsed = timestamp - this.startTime
      const progress = Math.min(elapsed / this.duration, 1)

      const currentValue = Math.floor(this.startValue + progress * (this.value - this.startValue))

      this.displayValue = this.useComma
        ? currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : currentValue.toString()

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate)
      } else {
        this.animationFrameId = null
      }
    }

    this.animationFrameId = requestAnimationFrame(animate)
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }
}
