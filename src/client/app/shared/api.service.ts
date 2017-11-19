import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Boat } from '../shared/boat.model';
import { Body } from '@angular/http/src/body';


@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;
  boats: Boat[];

  constructor(private http: Http, private auth: AuthService) { }

  get(url: string) {
    return this.request(url, RequestMethod.Get);
  }

  // getById(url: string) {
  //   console.log(url);
  //   // console.log('madeittogetbyid');
  //   return this.request(url, RequestMethod.Get);
  // }

  getById(url: string) {
    console.log(url);
    // console.log(body);
    console.log('madeittogetbyid');
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers
    });

    // console.log(body);
    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    console.log(request);

    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  }

  onRequestError(res: Response) {
    const statusCode = res.status;
    console.log(res.status);
    console.log('heres the error');
    console.log(res);
    const body = res.json();
    console.log(body);

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    console.log(error);

    return Observable.throw(error);
  }

}
