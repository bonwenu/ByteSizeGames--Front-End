import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/Question';
import { Result } from 'src/app/models/Question';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ElementRef, ViewChild } from '@angular/core';
import * as socketIO from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 60});
}


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
 // show : boolean = false;
  show_answer : boolean = false;
  user_answer : string;
  answers : string[];
 
  theQuestions : string[];
  theQuestion : string;

  btnOne;
  btnTwo;
  btnThree;
  btnFour;

  buttonOne;
  correctAnswer;
  arrayItem;

  curUser;
  curUserId;
  curUserAnswer : string;
  answerBelongsTo;


  constructor(private modalService: BsModalService, private questionService: QuestionService, private http : HttpClient) { }

  fisherYates(array) {
    let count = array.length,
      randomnumber,
      temp;
    while (count) {
      randomnumber = (Math.random() * count--) | 0;
      temp = array[count];
      array[count] = array[randomnumber];
      array[randomnumber] = temp;
    }
  }

  ngOnInit() {
  //  this.getQuestions();
    this.timer();
   this.progressBarType = "";
    this.socket = socketIO('http://localhost:3000');
    this.getTokens();
    
    this.buttonOne = document.createElement("button");
    this.buttonOne.innerHTML = "BUTTON HAS BEEN MADE";
    document.body.appendChild(this.buttonOne);
    //console.log(this.buttonOne);
    this.curUser = JSON.parse(sessionStorage.getItem("User"));
    this.curUserId = this.curUser.userId;
    console.log(this.curUserId);

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

  bntClass = [
    'btn btn-outline-secondary btn-block',
    'btn btn-outline-secondary btn-block',
    'btn btn-outline-secondary btn-block',
    'btn btn-outline-secondary btn-block'
  ]
 
  bntStyle = [
    {'font-size': '2vh', 'color': 'darkviolet', 'font-weight': '500'},
    {'font-size': '2vh', 'color': 'darkviolet', 'font-weight': '500'},
    {'font-size': '2vh', 'color': 'darkviolet', 'font-weight': '500'},
    {'font-size': '2vh', 'color': 'darkviolet', 'font-weight': '500'}
  ]

  isTyping() {
      this.socket.emit('typing', this.username.nativeElement.value);
      
  }

  getTokens(){
    let url = "http://localhost:8082/socket/ie";
    this.http.get(url).subscribe(data =>{
     // console.log(("Full: " + JSON.parse(data[2]).results)[0]);
      console.log((JSON.parse(data[2]).results)[0].question);
      console.log((JSON.parse(data[2]).results)[0].correct_answer);
      this.theQuestion = (JSON.parse(data[2]).results)[0].question;
      this.correctAnswer = ((JSON.parse(data[2]).results)[0].correct_answer);
      document.getElementById("questionDiv").innerHTML = this.theQuestion;
    })
  }

  sendMsg(){
    this.socket.emit('chat', 
      {msg: this.message.nativeElement.value, 
        username: this.username.nativeElement.value
      });
      this.curUserAnswer = this.message.nativeElement.value;
      console.log("CURRENT ANSWER: " + this.curUserAnswer);
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

  progressBarClass = "progress-bar progress-bar-striped progress-bar-animated active";

  //counter: number;
  //correctAnswer: string;
  reply: string;
  progressBarType: string = "";
  show: boolean = false;
  counterReachesZero = true;

  disabled: boolean = false;

  selection(selected : string){
    let selectedBtn = document.getElementById(selected);
    if (selectedBtn.innerHTML === this.curUserAnswer){
      console.log("YOUR ANSWER WAS CHOSEN");
      // URL is /game/userId, Send Funny Points, True Points
    } else if (selectedBtn.innerHTML === this.correctAnswer){
      console.log("CORRECT ANSWER CHOSEN");
    }
  }

  timer() {
        let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            console.log(this.counter)
            if(this.counter === 0 && this.round === 0) {
              //clearInterval(intervalId)
              this.show = !this.show;
              this.counter = 10;
              this.round++;
            } else if (this.counter === 0 && this.round === 1){
            //  this.show = !this.show;
              if (this.answers !== null) {
                this.answers = this.user_answer.split("_$%");
              }
              console.log(this.answers);
              this.counter = 3;
              this.round++;

            } else if (this.counter === 0 && this.round === 2){
              clearInterval(intervalId);
              this.displayAnswers();
              this.show_answer = !this.show_answer;
              console.log("ROUND 2");
            }

        }, 1000)
    }
    
    displayAnswers() {
      // let varNames : Object[];
      // let buttonArray : any[];
      // let goBefore = document.getElementById("goBefore");
      // console.log("DISPLAY ANSWERS IS RUNNNNNNIN");
      // console.log("Answers Length: " + this.answers.length);
      // for(let i = 0; i < this.answers.length, i++;){
      //   console.log("Makin them variables");
      //   varNames.push("varName" + [i].toString());
      //  buttonArray.push(varNames[i] = document.createElement("button"));
      //  // varNames[i] = this.answers[i];
      // }
      // for(let i = 0; i > this.answers.length, i++;){
      //   buttonArray[i].innerHTML = this.answers[i];
      //   document.body.insertBefore(buttonArray[i], goBefore);
      //   console.log("Where be my buttons");
      // }

      // Why. Why is this null.
      this.btnOne = document.getElementById('btnOne');
      this.btnTwo = document.getElementById("btnTwo");
      this.btnThree = document.getElementById("btnThree");
      this.btnFour = document.getElementById("btnFour");

      let goBefore = document.getElementById("goBefore");
      
      console.log(this.btnOne);
      console.log(this.btnOne + " " + this.btnTwo);
      let conOne = this.answers[0].toString();
      let conTwo = this.answers[1].toString();
      console.log(conOne + " " + conTwo);
      this.btnOne.innerHTML =  this.answers[0].toString();
      this.btnTwo.innerHTML = this.answers[1].toString();
      this.btnThree.innerHTML = this.answers[2].toString();
      this.btnFour.innerHTML = this.correctAnswer.toString();
    };

   

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