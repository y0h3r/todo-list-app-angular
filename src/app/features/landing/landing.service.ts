import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@features/landing/state/user.state';
import { ENV } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${ENV.apiUrl}/users`;
  private http = inject(HttpClient);

  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${email}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
