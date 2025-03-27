import { Component, OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-register-form',
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,MatCheckboxModule,ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit{
  registerForm: FormGroup
  hidePassword = true

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue],
    })
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log("Register form submitted", this.registerForm.value)
      // Add your registration logic here
    }
  }
}
