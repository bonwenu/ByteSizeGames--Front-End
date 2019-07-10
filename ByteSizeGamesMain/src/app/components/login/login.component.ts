import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from 'q';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalRef: BsModalRef;
  users : object; 

  username : string;
  user_Pass : string;
  user_Pass_2 : string;
  first_Name : string;
  last_Name : string;
  email : string;
  add_border : string;
  path_ : string;

  constructor(private modalService: BsModalService, private LoginService: LoginServiceService, private router: Router,
    private route: ActivatedRoute) {}
 
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit() {
  }

  // must click login button twice for some reason, not sure
  doLogin(username_ : string, password_ : string) {
    this.LoginService.checkLogin(username_, password_);
    let user = JSON.parse(sessionStorage.getItem("User"));
    console.log("Outside if user info:" + user.firstName);
    if (user === null || user.firstName === null || user.lastName === null) {
      console.log("This should be called when the null is true");
      console.log(user);
      this.add_border = "input-custom";
      sessionStorage.clear();

      console.log("INSIDE IF");

      } 
      else {
        console.log("This should be called when you actually have a acutal user");
        this.path_ = '/play';
        console.log(this.path_);
        this.router.navigateByUrl('/play');

      }
    // console.log(username_, password_);
  }

  submitForm(username : string, user_Pass : string, user_Pass_2: string, first_Name : string, last_Name, email : string) {
    // console.log("Form submitted" + "Login.components.ts  out of sub");
    this.LoginService.createTheAccount(username, user_Pass, user_Pass_2, first_Name, last_Name, email);
    // console.log("Yo these null? " + username, user_Pass, user_Pass_2, first_Name, last_Name, email);

  }

  calledFromServiceService(s:String){
    console.log(s);
  }

}
