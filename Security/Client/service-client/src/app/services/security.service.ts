import { Injectable } from '@angular/core';
// import {Http, Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';  // OLD
// import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from '@angular/common/http'; // MUST IMPORT HTTPCLIENT MODULE
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'; // handle error cases w toasters

@Injectable({
  providedIn: 'root' // ?
})
export class SecurityService { // todo auth interceptors. use pipe for catchError() and success

  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'my-auth-token'
  //   })
  // };

  domain = 'http://localhost:5000/'; // dev domain not for prd --> eventually useful for deployment
  constructor(
    private http: HttpClient
  ) { }

  /**
   * addHero (hero: Hero): Observable<Hero> {
   * return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
   * .pipe(
   *  catchError(this.handleError('addHero', hero))
   * );
   * }
   */

  getSecurities() {
    return this.http.get(this.domain + 'api/security');
  }

  getOneSecurity(id: number) {
    return this.http.get(this.domain + `api/security/${id}`);
  }

  deleteOneSecurity(id: number) {
    return this.http.delete(this.domain + `api/security/${id}`);
  }

  // todo post, patch for sec. all CRUD for secPrices

  // registerUser(user) {
  //   return this.http.post(this.domain + '/api/authentication/register', user); // .pipe();
  // should do expected return type here post<Type>
  // }

  // checkUsername(username) {
  //   return this.http.get(this.domain + `/api/authentication/checkUsername/${username}`);
  // }
  //
  // checkEmail(email) {
  //   return this.http.get(this.domain + `/api/authentication/checkEmail/${email}`);
  // }
}
