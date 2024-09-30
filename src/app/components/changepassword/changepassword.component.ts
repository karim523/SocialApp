import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss',
})
export class ChangepasswordComponent {
  private readonly _UsersService = inject(UsersService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  changePassSub!: Subscription;

  changePassForm: FormGroup = this._FormBuilder.group(
    {
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],

      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],
      // rePassword:[null,[]]
    }
    // { validators: [this.confirmPassword] }
  );

  changePassSubmit(): void {
    this.changePassSub = this._UsersService
      .changePassword(this.changePassForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message, 'linked post');
          localStorage.setItem('socialToken', res.toekn);
          this._Router.navigate(['/login']);
        },
      });
  }
  // confirmPassword(pass: AbstractControl) {
  //   if (pass.get('newPassword')?.value === pass.get('rePassword')?.value) {
  //     return null;
  //   } else {
  //     return { mismatch: true };
  //   }
  // }
  ngOnDestroy(): void {
    this.changePassSub?.unsubscribe();
  }
}
