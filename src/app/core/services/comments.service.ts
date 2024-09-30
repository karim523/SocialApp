import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private _HttpClient: HttpClient) {}

  creatComment(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}comments`, data);
  }
  getPostComment(postId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}posts/${postId}/comments`);
  }
  updatePostComment(commentId: string, data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}comments/${commentId}`,
      data
    );
  }
  deletComment(commentId: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}comments/${commentId}`
    );
  }
}
