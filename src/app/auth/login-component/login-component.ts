import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggingIn: boolean = false;
  loginError: boolean = false;
  errorMessage: string = 'An error occurred. Please try again!';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoggingIn = true;
    this.loginError = false;

    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.isLoggingIn = false)))
      .subscribe({
        next: (resp) => {
          this.authService.setUserToken(resp.token);
          this.router.navigate(['/campaigns/list']);
        },
        error: (err) => {
          if (err.error?.error_name) {
            this.errorMessage = err.error.message;
          }
          this.loginError = true;
        },
      });
  }
}
