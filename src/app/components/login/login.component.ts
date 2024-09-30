import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _UsersService = inject(UsersService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  loginSub!: Subscription;
  msgError: string = '';
  isLoading: boolean = false;
  msgSucces: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ],
    ],
  });

  loginSubmit(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.loginSub = this._UsersService
        .signIn(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message == 'success') {
              this.msgSucces = true;
              setTimeout(() => {
                localStorage.setItem('socialToken', res.token);
                this._UsersService.saveUserData();
                this._Router.navigate(['/timeline']);
              }, 800);
            }

            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.msgError = err.error.massage;
            console.log(err);
            this.isLoading = false;
          },
        });
    } else {
      this.loginForm.setErrors({ mismatch: true });
      this.loginForm.markAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
