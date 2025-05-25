import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false)
  public darkMode$ = this.darkModeSubject.asObservable()

  constructor() {
    // Check if dark mode preference exists in localStorage
    const storedPreference = localStorage.getItem("darkMode")
    if (storedPreference) {
      this.setDarkMode(storedPreference === "true")
    }
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode)
    localStorage.setItem("darkMode", isDarkMode.toString())

    if (isDarkMode) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.darkModeSubject.value)
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value
  }
}
