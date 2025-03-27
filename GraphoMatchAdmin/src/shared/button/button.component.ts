import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: "button" | "submit" | "reset" = "button"
  @Input() variant: "default" | "outline" | "ghost" = "default"
  @Input() size: "sm" | "md" | "lg" = "md"
  @Input() disabled = false
}
