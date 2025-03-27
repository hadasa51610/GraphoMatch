import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor{
  @Input() type = "text"
  @Input() placeholder = ""
  @Input() id = ""
  @Input() dir = "ltr"
  @Input() autoFocus = false

  value: any = ""
  disabled = false

  onChange: any = () => {}
  onTouched: any = () => {}

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.value = value
    this.onChange(value)
    this.onTouched()
  }
}
