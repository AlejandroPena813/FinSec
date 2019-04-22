import { Injectable } from '@angular/core';
// import {Http, Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';  // OLD
// import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from '@angular/common/http'; // MUST IMPORT HTTPCLIENT MODULE
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Security } from '../models/Security'; // handle error cases w toasters

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

  // Securities
  getSecurities() {
    return this.http.get(this.domain + 'api/security');
  }

  getOneSecurity(id: number) {
    return this.http.get(this.domain + `api/security/${id}`);
  }

  deleteOneSecurity(id: number) { // TODO ISSUES, SUCCESS BUT FAILURE SHOWS. 200 HTTP
    return this.http.delete(this.domain + `api/security/${id}`);
  }

  createSecurity(security) { // should do type here :Type
    return this.http.post(this.domain + 'api/security', security); // should do expected return type here post<Type>
  }

  updateSecurity(security) {
    return this.http.patch(this.domain + 'api/security', security); // should do expected return type here post<Type>
  }

  // Security Prices Below
  // todo patch for sec. all post/patch for secPrices

  deleteOnePrice(id: number) {
    return this.http.delete(this.domain + `api/securityprice/${id}`);
  }

  // todo issue of non-unique
  createPrice(price) { // should do type here :Type
    return this.http.post(this.domain + 'api/securityprice', price); // should do expected return type here post<Type>
  }

}
