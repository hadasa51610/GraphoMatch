import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from "@angular/animations"
import { NavbarComponent } from "../components/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from "../components/login-form/login-form.component";
import { RegisterFormComponent } from "../components/register-form/register-form.component";
import { FeaturesComponent } from "../components/features/features.component";
import { TestimonialsComponent } from "../components/testimonials/testimonials.component";
import { FooterComponent } from "../components/footer/footer.component";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatIconModule, LoginFormComponent, RegisterFormComponent,
     FeaturesComponent, TestimonialsComponent, FooterComponent, MatCardModule,
     MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'GraphoMatchUser';
  activeTab = "login"

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  onTabChange(index: number): void {
    this.activeTab = index === 0 ? "login" : "register"
  }
}
