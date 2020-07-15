import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment } from '../../environments/environment'
import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  
  constructor(private http: HttpClient) { }

  userSubject = new BehaviorSubject(localStorage.getItem('access_token'));
  userDetails = this.userSubject.asObservable();

  cartSubject = new BehaviorSubject(null);
  cartDetails = this.cartSubject.asObservable();

  cartItemSubject = new BehaviorSubject(null);
  cartItem = this.cartItemSubject.asObservable();


  postData(url, data): Observable<any>
  {
      return this.http.post(url, data);
  }

  patchData(url, data): Observable<any>
  {
      return this.http.put(url, data);
  }

  deleteItem(url): Observable<any>
  {
      return this.http.delete(url);
  }

  getData(url):Observable<any>
  {
      return this.http.get(url);
  }

  getUserDetails()
  {
    let access_token = localStorage.getItem('access_token');
      return access_token;
  }
   
  
}
