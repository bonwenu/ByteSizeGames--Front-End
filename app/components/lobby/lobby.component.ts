import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as socketIO from "socket.io-client";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  private socket: any;


  constructor (private router: Router) {}

  ngOnInit() {
    this.socket = socketIO('http://localhost:3000');
  }

  public ngAfterViewInit() {
    console.log("NgAfter Running");
    this.socket.on('start_game', (data) =>{
      console.log(data);
      this.router.navigate([data])
  });
  }

  startGame() {
    this.socket.emit("start_pushed", "holder");
}


}
