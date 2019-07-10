import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/Question';
import { Result } from 'src/app/models/Question';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ElementRef, ViewChild } from '@angular/core';
import * as socketIO from "socket.io-client";



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild("message", {static: false})  message: ElementRef;
  
  @ViewChild("chat", {static: false})  chat: ElementRef;
  @ViewChild("username", {static: false})  username: ElementRef;
  @ViewChild("send", {static: false})  send_Btn: ElementRef;
  @ViewChild("output", {static: false})  output: ElementRef;
  @ViewChild("feedback", {static: false})  feedback: ElementRef;
  
  private socket: any;
  title = 'ByteSizeGames';

  res_ : Result[] = [{  
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correctAnswer: ""}];

  
  question_: Question = {results: this.res_};
  modalRef: BsModalRef;


  questions_: Question[] = [];
  question_Asked: boolean = false;

  q_ : Result = { category: "",
  type: "",
  difficulty: "",
  question: "",
  correctAnswer: ""};

  counter = 5;
  round = 0;
  show : boolean = false;
  show_answer : boolean = false;
  user_answer : string;
  answers : string[];
 
  


  constructor(private modalService: BsModalService, private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
    this.timer();
    this.socket = socketIO('http://localhost:3000');
  }

  public ngAfterViewInit() { 

    // Listen for events
    this.socket.on('chat', (data) => {
    this.feedback.nativeElement.innerHTML = '';
    this.user_answer = this.output.nativeElement.innerHTML += data.msg + "_$%";
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

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  delayModal(temp) {
    setTimeout(function() {this.openModalWithClass(temp)}, 10000);
  }

  timer() {
        let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            console.log(this.counter)
            if(this.counter === 0 && this.round === 0) {
              //clearInterval(intervalId)
              this.show = !this.show;
              this.counter = 15;
              this.round++;
            } else if (this.counter === 0 && this.round === 1){
              clearInterval(intervalId)
              this.show_answer = !this.show_answer;
              this.show = !this.show;
              this.answers = this.user_answer.split("_$%");
              console.log(this.answers);
            }
        }, 1000)
    }

  saveAnswer() {
    console.log("saveAnswer is running");
  }

  getAnswer(answer_ : string) {
    this.user_answer = answer_;
  }

  getQuestions() {
    this.questionService.getQuestion()
     .then((all_Questions)=>{
      console.log(all_Questions.results[3]);
      this.question_ = all_Questions[0];
      console.log(all_Questions);
      this.q_ = all_Questions.results[3];
      console.log(this.q_);
      this.question_Asked = true;
    })

  }
  

}