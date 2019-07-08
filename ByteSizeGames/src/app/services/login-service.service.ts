import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  url = "http://localhost:8082/users";

  constructor(private http : HttpClient) { }

  login() {
    return this.http.get(this.url);
   }
   

};
