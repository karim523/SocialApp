import { Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },

  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
    title: 'ChangePassword',
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    title: 'TimeLine',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
  },
];
