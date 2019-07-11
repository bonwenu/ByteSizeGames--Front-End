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

  @ViewChild("message")  message: ElementRef;
  
  @ViewChild("chat")  chat: ElementRef;
  @ViewChild("username")  username: ElementRef;
  @ViewChild("send")  send_Btn: ElementRef;
  @ViewChild("output")  output: ElementRef;
  @ViewChild("feedback")  feedback: ElementRef;
  @ViewChild("questionDisplay") questionDisplay: ElementRef;
  @ViewChild("countOutput") countOutput : ElementRef;
  
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
  socketQuestion : string;
  count = 20;



  constructor(private modalService: BsModalService, private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions(); // Can't use this, gives different answers. But why isn't displaying on second?
    this.timer();
    this.socket = socketIO('http://localhost:3000');

  }

  public ngAfterViewInit() { 

    // Listen for events
    this.socket.on('chat', (data) => {
      console.log("Can I print from here?");
    this.feedback.nativeElement.innerHTML = '';
    this.user_answer = this.output.nativeElement.innerHTML += data.msg + "_$%" ;
    });

    this.socket.on('typing', (data) => {
      this.feedback.nativeElement.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });

    this.socket.on('countdown', (data) => {
      console.log("Countdown Started");
     data = this.count;
      this.countOutput.nativeElement.innerHTML = data + "Hardcoded Test";
    });

    this.socket.on('displayQuestion', (data) => {
      console.log("Yo this be called or what?");
      this.questionDisplay.nativeElement.innerHTML += data + "Hardcoded test";
  });

  //this.countOutput.nativeElement.innerHTML = this.countdown();

  this.socket.on('countdown', (data) => {
    console.log("Countdown Started");
   // data = this.countdown();
    this.countOutput.nativeElement.innerHTML = data + "Hardcoded Test";
  });

  this.socket.on('timer', (data) => {
    console.log("Timer has started");
  });

    
  }

  isTyping() {
      this.socket.emit('typing', this.username.nativeElement.value);
      
  }

  displayQuestion() {
    // this.questionDisplay.nativeElement.value = this.socketQuestion;
    // this.questionDisplay.nativeElement.innerHTML = this.socketQuestion;
    this.socket.emit('displayQuestion', (this.questionDisplay.nativeElement.innerHTML = this.socketQuestion));
    this.questionDisplay.nativeElement.value = "";
    console.log("Displaying in DisplayQuestion(): " + this.questionDisplay.nativeElement.innerHTML);
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

  countdown() {
    console.log("Countdown Function");
    let intervalId = setInterval(() => {
      console.log("Inside Interval");
    this.count = this.count - 1;
    this.socket.emit('countdown', this.count.toString());
    console.log(this.count.toString());
    if (this.count === 0) {
      clearInterval(intervalId);
      this.count = 20;
    }
    }, 1000);
    return this.count;

  }


  timer() {
        let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            if(this.counter === 0 && this.round === 0) {
              //clearInterval(intervalId)
              this.socket.emit('timer', this.counter);
              this.show = !this.show;
              this.counter = 15;
              this.round++;
            } else if (this.counter === 0 && this.round === 1){
              clearInterval(intervalId)
              this.show_answer = !this.show_answer;
              this.show = !this.show;
              if (this.answers === null)  {
                 this.answers = this.user_answer.split("_$%");
              }
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
      this.question_ = all_Questions[0];
      this.q_ = all_Questions.results[3];
      //console.log(this.q_.question);
      this.question_Asked = true;
      return this.q_.question;
    })

  }
  

}