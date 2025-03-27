import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormField} from '@angular/material/form-field'
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-overlay',
  imports: [MatFormField,MatLabel,MatIconModule],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {
  @Output() close = new EventEmitter<void>()

  closeSearch(): void {
    this.close.emit()
  }
}
