import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalRef: BsModalRef;
  users : object; 

  constructor(private modalService: BsModalService, private LoginService: LoginServiceService) {}
 
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit() {
  }

  submitForm() {
    console.log("Form submitted");
    this.LoginService.login().subscribe( data => {
      this.users = data;
      console.log(this.users);
    })
  }

}
