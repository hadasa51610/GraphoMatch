import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations"
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchOverlayComponent } from "../search-overlay/search-overlay.component";


@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatToolbarModule, SearchOverlayComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger("mobileMenuAnimation", [
      transition(":enter", [
        style({ opacity: 0, height: 0 }),
        animate("300ms ease-out", style({ opacity: 1, height: "*" })),
      ]),
      transition(":leave", [
        style({ opacity: 1, height: "*" }),
        animate("300ms ease-in", style({ opacity: 0, height: 0 })),
      ]),
    ]),
    trigger("searchAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateY(0)" }),
        animate("300ms ease-in", style({ opacity: 0, transform: "translateY(-20px)" })),
      ]),
    ]),
  ],
})
export class NavbarComponent {
  @Output() tabChange = new EventEmitter<string>()

  mobileMenuOpen = false
  searchOpen = false

  navLinks = [
    { name: "בית", href: "#" },
    { name: "תכונות", href: "#features" },
    { name: "תמחור", href: "#pricing" },
    { name: "עדויות", href: "#testimonials" },
    { name: "צור קשר", href: "#contact" },
  ]

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen
  }

  setActiveTab(tab: string): void {
    this.tabChange.emit(tab)
    this.mobileMenuOpen = false
  }
}
