import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
  
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {
    if (this.isLoggedIn()) {
      this.setAuth();
    }
  }

  private isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  private transformToFormData(data: object): string {
    const str = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

    return str.join('&');
  }

  private setAuth() {
    this.isAuthenticatedSubject.next(true);
  }

  private purgeAuth() {
    this.isAuthenticatedSubject.next(false);
  }

  login(data: object): Observable<any> {
    const body = this.transformToFormData(data);

    return this.http.post(`http://localhost:5000/api/user/login`, body, {
        headers: this.headers.append('ignoreAuthModule', 'true'),
    })
        .pipe(map(
            (res: any) => {
                console.log(res)
                localStorage.setItem('token', res);
                this.setAuth();
                return res;
            }),
            catchError(this.formatErrors)
        );
  }

  logout() {
    localStorage.clear();
    this.purgeAuth();
  }
}
