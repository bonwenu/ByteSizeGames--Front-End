import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { async, timeout } from 'q';
import { timer } from 'rxjs';


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
  //user;
  
  counter = 5;

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


   doLogin(username_ : string, password_ : string){
     this.LoginService.checkLogin(username_, password_);
    this.testUser();
  }
  
   testUser(){
    let user = JSON.parse(sessionStorage.getItem("User"));
    console.log(user);
    for(let i =0; i < 100; i++){
    if (user === null || user.firstName === null ||user.lastName === null) {
      if(sessionStorage.length > 0){
        console.log("Shits in SessionStorage");
        sessionStorage.clear();
      }
      console.log(sessionStorage.length)
    }
    else{
      this.path_ = '/play';
      console.log(this.path_);
      this.router.navigateByUrl('/play');

    }
  }

  }

  // must click login button twice for some reason, not sure
  // async doLogin(username_ : string, password_ : string) {
  //   this.LoginService.checkLogin(username_, password_);
  //   this.resolveAfter2Seconds(this.user = JSON.parse(sessionStorage.getItem("User")));
  //   console.log("doLogin Normal: " + this.user);
  //   await this.doLogin2(this.user);
  //   return this.user;
   // console.log("Outside if user info:" + user.firstName);
    // if (user === null || user.firstName === null || user.lastName === null) {
    //   console.log("This should be called when the null is true");
    //   console.log(user);
    //   this.add_border = "input-custom";
    //   //sessionStorage.clear();

    //   console.log("INSIDE IF");
    //   this.endTheSession();
    //   } 
    //   else {
    //     console.log("This should be called when you actually have an acutal user");
    //     this.path_ = '/play';
    //     console.log(this.path_);
    //     this.router.navigateByUrl('/play');

    //   }
    // console.log(username_, password_);
//  }

//   async doLogin2(user_) {
//       console.log("Do Login2 Called");
//       //console.log("DoLogin2: " + user_)
//     if (user_ === null || user_.firstName === null || user_.lastName === null) {
//       console.log("This should be called when the null is true");
//       console.log(this.user_Pass_2);
//       this.add_border = "input-custom";
//       //sessionStorage.clear();

//       console.log("INSIDE IF");
//       this.endTheSession();
//       } 
//       else {
//         console.log("This should be called when you actually have an acutal user");
//         this.path_ = '/play';
//         console.log(this.path_);
//         this.router.navigateByUrl('/play');

//       }
//   }

  // resolveAfter2Seconds(x) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(x);
  //     }, 2000);
  //   });
  // }

//   endTheSession(){
//     console.log("EndSession Called");
//     this.timer();
//   }

//   timer() {
//     let intervalId = setInterval(() => {
//         this.counter = this.counter - 1;
//         console.log(this.counter)
//         if(this.counter === 0) {
//           clearInterval(intervalId);  
//           sessionStorage.clear();
//           console.log("Hello from endTheSession");
//           this.counter = 5;
//         } 
//     }, 1000)
// }

//   submitForm(username : string, user_Pass : string, user_Pass_2: string, first_Name : string, last_Name, email : string) {
//     // console.log("Form submitted" + "Login.components.ts  out of sub");
//     this.LoginService.createTheAccount(username, user_Pass, user_Pass_2, first_Name, last_Name, email);
//     // console.log("Yo these null? " + username, user_Pass, user_Pass_2, first_Name, last_Name, email);

//   }

//   calledFromServiceService(s:String){
//     console.log(s);
//   }

}
