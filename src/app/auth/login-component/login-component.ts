/**
 * @module app/auth/login-component
 * @description This module contains the LoginComponent component for user authentication.
 * 
 * This component handles user login functionality, interacting with the AuthService to authenticate users and redirect them upon successful login.  It utilizes Angular's reactive forms for input validation.
 * 
 *  **Dependencies:**
 *  - @angular/common
 *  - @angular/forms
 *  - @angular/core
 *  - @angular/router
 *  - app/auth/auth.service (for authentication logic)
 *  - rxjs (for observable handling)
 *
 *  **Exports:**
 *  - LoginComponent: The Angular component for handling user login.
 */

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

/**
 * @class LoginComponent
 * @description This component handles user login functionality. It uses a reactive form for input validation and interacts with the `AuthService` to perform the login process.  Upon successful login, it redirects the user to the campaign list.
 */
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
  standalone: false,
})
export class LoginComponent {
  /** Reactive form group for managing login inputs. */
  loginForm: FormGroup;
  /** Flag to indicate if login process is in progress. */
  isLoggingIn: boolean = false;
  /** Flag to indicate if a login error occurred. */
  loginError: boolean = false;
  /** Error message to display to the user. */
  errorMessage: string = '';

  /**
   * @constructor
   * @param {FormBuilder} fb - Angular's FormBuilder for creating reactive forms.
   * @param {AuthService} authService - Service for handling authentication logic.
   * @param {Router} router - Angular's Router for navigation.
   */
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

  /**
   * Getter for the email control in the login form.
   * @returns {AbstractControl} - The email form control.
   */
  get email() {
    return this.loginForm.get('email')!;
  }

  /**
   * Getter for the password control in the login form.
   * @returns {AbstractControl} - The password form control.
   */
  get password() {
    return this.loginForm.get('password')!;
  }

  /**
   * Handles the login form submission.
   * Validates the form, then attempts to log in via the AuthService.
   * Upon success, redirects the user. Upon failure, displays an error message.
   * @throws {Error} If the login attempt fails. The error message will be displayed to the user.  
   */
  submit() {
    // Mark all controls as touched to show validation errors immediately.
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoggingIn = true;
    this.loginError = false;

    //Using finalize to ensure isLoggingIn flag is set to false even if there is an error or success
    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.isLoggingIn = false)))
      .subscribe({
        next: (resp) => {
          //Store the token securely, consider using a more robust solution like secure storage instead of localstorage
          this.authService.setUserToken(resp.token);
          this.router.navigate(['/campaigns/list']);
        },
        error: (err) => {
          //Handle different error scenarios appropriately.  Consider logging the error to a centralized logging service.
          this.errorMessage = err.error?.error_name ? err.error.message : 'An error occurred. Please try again!';
          this.loginError = true;
        },
      });
  }
}
