import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

// const BASE_URL = 'http://localhost:4222/api/users/';
const BASE_URL = 'https://ec2-3-16-151-157.us-east-2.compute.amazonaws.com:4222/api/users/';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
    returnUrl: string;
    isLoggedIn(): boolean {
        return;
    }
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
  ) {
      this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
      this.currentUser = this.currentUserSubject.asObservable();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  public get currentUserValue() : any {
      return localStorage.getItem('token');
  }

  register(user: User): Observable<any> {
    return this.http.post(BASE_URL + 'userRegister', user)
  }

  emailVerify(code): Observable<any> {
    return this.http.post(BASE_URL + 'emailVerify', code)
  }

  login(payload): Observable<any> {
    return this.http.post(BASE_URL + 'userLogin', payload)
        .pipe(
            map(res => {
              if (res['success'] === true) {
                localStorage.setItem('token', res['token']);
                localStorage.setItem('userName', res['data'].userName);
              }
              return res;
            }
            )
        )
  }



  emailConfirm(userEmail): Observable<any> {
      return this.http.post(BASE_URL + 'emailConfirm', userEmail)
  }

  confirmCode(code): Observable<any> {
      return this.http.post(BASE_URL + 'confirmCode', code)
  }

  resetPassword(password): Observable<any> {
      return this.http.post(BASE_URL + 'resetPassword', password)
  }
}
