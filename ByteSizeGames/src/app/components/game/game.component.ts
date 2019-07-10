import { Component, OnInit, Input } from "@angular/core";
import { QuestionService } from "src/app/services/question.service";
import { Result } from "src/app/models/Question";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
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

  ngOnInit() {}

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

  changeClass(i) {
    this.bntClass[i] = 'btn btn-primary btn-block';
  }

  changeStyle(i) {
    this.bntStyle[i] = {'font-size': '2vh', 'color': 'black', 'font-weight': 'bold'};
  }

  checkAnswer(i) {
    console.log("what is the value here " + i);
    // for(let index in this.incorrectAnswersArray) {
    //   if( i == index )
    // }
  }
  

  
  counter = 5;
  round = 0;
  show : boolean = false;
  show_answer : boolean = false;
  user_answer : string;

  timer() {
    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter);
      if (this.counter === 0 && this.round === 0) {
        //clearInterval(intervalId)
        this.show = !this.show;
        this.counter = 15;
        this.round++;
      } else if (this.counter === 0 && this.round === 1) {
        clearInterval(intervalId);
        this.show_answer = !this.show_answer;
        this.show = !this.show;
      }
    }, 1000);
  }

  getAnswer(answer_: string) {
    this.user_answer = answer_;
  }

}
