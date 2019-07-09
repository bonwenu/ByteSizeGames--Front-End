import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as socketIO from "socket.io-client";

@Component({
  selector: 'app-chat-demo',
  templateUrl: './chat-demo.component.html',
  styleUrls: ['./chat-demo.component.css']
})
export class ChatDemoComponent implements OnInit {

  // Equivalent of document.getElementById
  
  @ViewChild("message")  message: ElementRef;
  
  @ViewChild("chat")  chat: ElementRef;
  @ViewChild("username")  username: ElementRef;
  @ViewChild("send")  send_Btn: ElementRef;
  @ViewChild("output")  output: ElementRef;
  @ViewChild("feedback")  feedback: ElementRef;
  
  
  private socket: any;
  title = 'ByteSizeGames';


            
  ngOnInit(){

   this.socket = socketIO('http://localhost:3000');
   //this.socket.on("hello", (data) => console.log(data.msg));

  }

  public ngAfterViewInit() { 

    // Listen for events
    this.socket.on('chat', (data) => {
    this.feedback.nativeElement.innerHTML = '';
    this.output.nativeElement.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.msg + '</p>';
    });

    this.socket.on('typing', (data) => {
      this.feedback.nativeElement.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });

  }

  isTyping() {
      this.socket.emit('typing', this.username.nativeElement.value);
      
  }

  sendMsg(){
    this.socket.emit('chat', 
      {msg: this.message.nativeElement.value, 
        username: this.username.nativeElement.value
      });
    this.message.nativeElement.value = "";
  }
}