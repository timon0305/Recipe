import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';

const BASE_URL = 'http://localhost:4201/api/users';

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
}
