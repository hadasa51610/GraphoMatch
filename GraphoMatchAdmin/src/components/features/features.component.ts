import { Component } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations"
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-features',
  imports: [MatCard,MatCardModule,MatIconModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class FeaturesComponent {
  features = [
    {
      title: "ממשק משתמש אינטואיטיבי",
      description: "ממשק נוח וקל לשימוש שמאפשר לך להתחיל לעבוד מיד, ללא צורך בהדרכה מורכבת.",
    },
    {
      title: "אבטחה ברמה הגבוהה ביותר",
      description: "הגנה מתקדמת על המידע שלך עם הצפנה מקצה לקצה ואימות דו-שלבי.",
    },
    {
      title: "התאמה אישית מלאה",
      description: "התאם את המערכת לצרכים הספציפיים שלך עם אפשרויות התאמה אישית מתקדמות.",
    },
  ]
}
