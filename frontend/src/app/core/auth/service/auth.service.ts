import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const BASE_URL = 'http://localhost:4222/api/users/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User>;
  constructor(
      private http: HttpClient
  ) { }

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
                localStorage.setItem('userName', res['data'].userName)
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
