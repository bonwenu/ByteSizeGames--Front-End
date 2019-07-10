import { Component, OnInit, Input } from "@angular/core";
import { QuestionService } from "src/app/services/question.service";
import { Result } from "src/app/models/Question";
import { BsModalService } from "ngx-bootstrap/modal";
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';


export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 60});
}

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class GameComponent implements OnInit {
  q_: Result = {
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correct_answer: "",
    incorrect_answers: []
  };

  constructor(
    private modalService: BsModalService,
    private questionService: QuestionService
  ) {
    this.getQuestion();
    this.timer();
  }

  ngOnInit() {
    this.counter = 60;
    this.progressBarType = "";
  }

  incorrectAnswersArray = [];

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

  getQuestion() {
    this.questionService.getQuestion().then(all_Questions => {
      this.q_ = all_Questions.results[0];
      console.log("below should be the question object");
      console.log(this.q_);
      console.log("debugging");
      console.log("category " + all_Questions.results[0].category);
      console.log("Correct answer " + all_Questions.results[0].correct_answer);
      this.correctAnswer = all_Questions.results[0].correct_answer;
      console.log("Incorrect answers " + all_Questions.results[0].incorrect_answers);
      this.incorrectAnswersArray = all_Questions.results[0].incorrect_answers;
      //console.log("incorrect_answer " + this.incorrectAnswersArray);
      this.incorrectAnswersArray.push(all_Questions.results[0].correct_answer);
      //console.log("incorrect_answer " + this.incorrectAnswersArray);
      this.fisherYates(this.incorrectAnswersArray);
      //console.log("incorrect_answer " + this.incorrectAnswersArray);
    });
  }

  disabled: boolean = false;
//  bntStyle: string = 'btn btn-outline-secondary btn-block';

	disableAll() {
    this.disabled = true;
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

  progressBarClass = "progress-bar progress-bar-striped progress-bar-animated active";
 
  changeClass(i) {
    this.bntClass[i] = 'btn btn-primary btn-block';
  }

  changeStyle(i) {
    this.bntStyle[i] = {'font-size': '2vh', 'color': 'black', 'font-weight': 'bold'};
  }

  counter: number;
  correctAnswer: string;
  reply: string;
  progressBarType: string = "";
  show: boolean = false;
  counterReachesZero = true;

  timer() {
    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      //console.log("progress bar value here " + this.progressBarValue[0].value + this.progressBarValue[0].type)

      if(this.counter <= 15) {
        this.progressBarType = 'danger';
        Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 60, type: "danger"});
        //getProgressbarConfig(this.progressBarType);

        //console.log("type is " + this.progressBarType);
        //this.progressBarClass = "progress-bar progress-bar-striped progress-bar-animated bg-warning active";
      } else if(this.counter <= 30) {
        this.progressBarType = 'warning';
        Object.assign(new ProgressbarConfig(), {animate: true, striped: true, max: 60, type: "warning"});
        //getProgressbarConfig(this.progressBarType);

        //console.log("type is " + this.progressBarType);
        //this.progressBarClass = "progress-bar progress-bar-striped progress-bar-animated bg-danger active";
      } 
      console.log(this.counter);

      if(this.counter == 0) {
        this.show = !this.show;
        this.disabled = true;
        this.counterReachesZero = false;
        clearInterval(intervalId);
      }
    }, 1000);
  }


  checkAnswer(i) {
    let x: number;
    console.log("what is the value here " + i);
    x = this.incorrectAnswersArray.indexOf(this.correctAnswer);
    console.log(this.incorrectAnswersArray.indexOf(this.correctAnswer));
    if( i == x ) {
      console.log('you guessed right');
      this.reply = 'You Guessed Right.';
    } else {
      console.log('you guess wrong');
      this.reply = 'You Guessed Wrong. Answer Is:';
    }
  }

}
