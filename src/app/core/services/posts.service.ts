import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  _Router = inject(Router);

  userData: any = null;
  constructor(private _HttpClient: HttpClient) {}
  creatPost(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}posts`, data);
  }
  getAllPosts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}posts`);
  }
  getMyPosts(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}users/664bcf3e33da217c4af21f00/posts`
    );
  }
  getSinglePost(postId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}posts/${postId}`);
  }
  updatePost(postId: string, data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}posts/${postId}`, data);
  }
  deletePost(postId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}posts/${postId}`);
  }

}
