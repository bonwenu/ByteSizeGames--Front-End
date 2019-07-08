import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, concat } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {


  constructor(private http : HttpClient) { }

  username : string;
  user_Pass : string;
  user_Pass_2 : string;
  first_Name : string;
  last_Name : string;
  email : string;

  login() {
    let url = "http://localhost:8082/users";
    return this.http.get(url);
   }

   submitUserForm(username, user_Pass, user_Pass_2, first_Name, last_Name, email) {
    console.log("Form submitted");
    this.login().subscribe( data => {
      console.log("NOTICE ME SENPIA" + username, user_Pass, user_Pass_2, first_Name, last_Name, email);
    })
    return concat(username ,user_Pass, user_Pass_2, first_Name, last_Name, email);

  }

  // Attempt #567
  createTheAccount(username, user_Pass, user_Pass_2, first_Name, last_Name, email){
    let url = "http://localhost:8082/login";
    console.log("We be postin stuff");
    return this.http.post(url, {"firstName" : first_Name,  "lastName" : last_Name, "username" : username, "password" : user_Pass, "email" : email}).subscribe( data => {console.log("POST sent");})
  }

   

};
