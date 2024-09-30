import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _UsersService = inject(UsersService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  registerSub!: Subscription;
  msgError: string = '';
  isLoading: boolean = false;
  msgSucces: boolean = false;
  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      rePassword: [null, []],
      dateOfBirth: [null, Validators.required],
      gender: [null, Validators.required],
    },
    { validators: [this.confirmPassword] }
  );

  registerSubmit(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.registerSub = this._UsersService
        .signUp(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message == 'success') {
              setTimeout(() => {
                this.msgSucces = true;
                this._Router.navigate(['/login']);
              }, 600);
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
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAsTouched();
    }
  }
  confirmPassword(pass: AbstractControl) {
    if (pass.get('password')?.value === pass.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
