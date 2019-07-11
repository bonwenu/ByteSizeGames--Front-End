import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { LoginServiceService } from "src/app/services/login-service.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  users: object;
  username: string;
  user_Pass: string;
  user_Pass_2: string;
  first_Name: string;
  last_Name: string;
  email: string;
  add_border: string;
  path_: string;
  //user;

  //counter = 5;

  constructor(
    private modalService: BsModalService,
    private LoginService: LoginServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private zone: NgZone
  ) {}

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "gray modal-lg" })
    );
  }

  ngOnInit() {}

  isInvalidUser: boolean = false;

  doLogin(username_: string, password_: string) {
    let url =
      "http://ec2-3-19-30-93.us-east-2.compute.amazonaws.com:8082/login";
    this.http
      .post(url, { username: username_, password: password_ })
      .subscribe(data => {
        sessionStorage.setItem("User", JSON.stringify(data));
        let user = JSON.parse(sessionStorage.getItem("User"));
        if (
          user === null ||
          user.firstName === null ||
          user.lastName === null
        ) {
          sessionStorage.removeItem("User");
          this.path_ = "/login";
          console.log(sessionStorage.length);
          window.sessionStorage.clear();
          localStorage.clear();
          this.isInvalidUser = true;
          this.openWrongLogin();
        } else {
          console.log("what is the length here " +  sessionStorage.length);
          this.path_ = "/home";
   
          //console.log(this.path_);

          //this.router.navigate(['/home'], { relativeTo: this.route });

          // this.zone.run(() => {
          //   this.router.navigate(["/home"]);
          // });

          //this.validateLogin();
          console.log(this.path_)
          this.router.navigate([this.path_]);
          

        }
      });
  }


  // leaderboard_play_logout: boolean;
  // logIn: boolean;

  // validateLogin(){
  //   //console.log("On load navs are hidden " + this.hidden);
  //   console.log("what is in the session storage? " + sessionStorage.getItem("User"));
  //   if (sessionStorage.getItem("User") !== null){ // user is LOGGED IN
  //     // shows leaderboard_play_logout;
  //     // DONT show Login
  //     this.leaderboard_play_logout = true;
  //     this.logIn = false;
  //     console.log("User logged in?");
  //     console.log("Should show leaderboard_play_logout " + this.leaderboard_play_logout)
  //     console.log("Should NOT show logIn " + this.logIn);
  //   } else { // NOT Logged In
  //     // DONT show leaderboard_play_logout
  //     // shows Login
  //     this.leaderboard_play_logout = false;
  //     this.logIn = true;
  //     console.log("User NOT logged in");
  //     console.log("Should NOT show leaderboard_play " + this.leaderboard_play_logout);
  //     console.log("Should show logIn " + this.logIn);
  //   }
  // };




  openWrongLogin() {
    document.getElementById("openWrongLoginModal").click();
  }

  openCantRegister() {
    document.getElementById("openCantRegisterModal").click();
  }

  submitForm(
    username: string,
    user_Pass: string,
    user_Pass_2: string,
    first_Name: string,
    last_Name,
    email: string
  ) {
    console.log("Form submitted" + "Login.components.ts  out of sub");
    this.LoginService.createTheAccount(
      username,
      user_Pass,
      user_Pass_2,
      first_Name,
      last_Name,
      email
    );

    let url =
      "http://ec2-3-19-30-93.us-east-2.compute.amazonaws.com:8082/login";
    this.http.post(url, { username }).subscribe(
      data => {
        console.log("succeed");
        this.path_ = "/home";
        console.log(this.path_);
        this.router.navigateByUrl("/home");
      },
      err => {
        this.openCantRegister();
      }
    );

    console.log(
      "Yo these null? " + username,
      user_Pass,
      user_Pass_2,
      first_Name,
      last_Name,
      email
    );
  }
}
