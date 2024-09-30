import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _Router = inject(Router);

  userData: any = null;
  constructor(private _HttpClient:HttpClient) { }

  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}users/signup`,data)
  }
  signIn(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}users/signin`,data)
  }
  changePassword(data:object):Observable<any>{
    return this._HttpClient.patch(`${environment.baseUrl}users/change-password`,data)
  }
  uploadPhoto(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}users/upload-photo`,data)
  }
  getLoggedUserData():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}users/profile-data`)
  }
  saveUserData(): void {
    if (localStorage.getItem('socialToken') !== null)
      this.userData = jwtDecode(localStorage.getItem('socialToken')!);
  }
  signOut(): void {
    localStorage.removeItem('socialToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }
}
