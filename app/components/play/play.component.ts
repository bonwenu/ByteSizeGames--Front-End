import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  modalRef: BsModalRef;
  gameCode: string = "";
  gc1: number;
  gc2: number;
  gc3: number;
  gc4: number;
  gc5: number;


  constructor(private modalService: BsModalService) { }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  generateGC() {
    this.gc1 = Math.floor(Math.random() * 9) + 1;
    this.gc2 = Math.floor(Math.random() * 9) + 1;  
    this.gc3 = Math.floor(Math.random() * 9) + 1;  
    this.gc4 = Math.floor(Math.random() * 9) + 1;  
    this.gc5 = Math.floor(Math.random() * 9) + 1;    
    this.gameCode = String(this.gc1) + String(this.gc2) + String(this.gc3) + String(this.gc4) + String(this.gc5);
    console.log(this.gameCode);
  }


  ngOnInit() {
  }

}
