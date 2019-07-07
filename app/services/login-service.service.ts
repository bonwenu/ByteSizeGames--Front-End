import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

url = "";

login() {
 // return this.httpOptions.post(this.url + '/API/id')
}



  constructor() { }
}
