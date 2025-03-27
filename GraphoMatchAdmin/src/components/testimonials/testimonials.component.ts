import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [MatCardModule,MatIconModule,CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class TestimonialsComponent {
  testimonials = [
    {
      quote: "המערכת שינתה לחלוטין את האופן שבו אנחנו מנהלים את העסק שלנו. הממשק אינטואיטיבי והתמיכה מעולה.",
      author: "יעל לוי",
      position: 'מנכ"לית, חברת טכנולוגיות בע"מ',
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "אני משתמש במערכת כבר שנתיים ולא הייתי מחליף אותה בשום דבר אחר. חוסכת לי שעות עבודה כל שבוע.",
      author: "דוד כהן",
      position: "יזם ומנהל עסקים",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "הפיצ'רים החדשים שהוסיפו לאחרונה הם בדיוק מה שחיפשנו. תמיד צעד אחד לפני המתחרים.",
      author: "מיכל גולן",
      position: "מנהלת שיווק, סטארטאפ חדשני",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]
}
