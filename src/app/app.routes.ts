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
    canActivate: [logedGuard],
    title: 'Login',
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [logedGuard],
    title: 'Register',
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    canActivate: [authGuard],
    title: 'Timeline',
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
    canActivate: [authGuard],
    title: 'Change Password',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Profile',
  },

  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
  },
];
