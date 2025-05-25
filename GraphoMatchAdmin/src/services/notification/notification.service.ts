import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(title: string, message: string): void {
    this.snackBar.open(`${title}: ${message}`, "Close", {
      duration: 5000,
      panelClass: ["success-snackbar"],
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }

  showError(title: string, message: string): void {
    this.snackBar.open(`${title}: ${message}`, "Close", {
      duration: 5000,
      panelClass: ["error-snackbar"],
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }

  showInfo(title: string, message: string): void {
    this.snackBar.open(`${title}: ${message}`, "Close", {
      duration: 5000,
      panelClass: ["info-snackbar"],
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }
}
