import { Component, OnInit, Input } from "@angular/core";
import { QuestionService } from "src/app/services/question.service";
import { Question } from "src/app/models/Question";
import { Result } from "src/app/models/Question";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

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
      //console.log("this should show category")
      //console.log(all_Questions.results[0]);
      this.q_ = all_Questions.results[0];
      console.log("below should be the question object");
      console.log(this.q_);

      console.log("debugging");
      // console.log("category " + this.q_.category);
      // console.log("type " + this.q_.type);
      // console.log("difficulty " + this.q_.difficulty);
      // console.log("question " + this.q_.question);
      // console.log("answer " + this.q_.correctAnswer);
      // console.log("inc " + this.q_.incorrectAnswers);
      console.log("category " + all_Questions.results[0].category);
      console.log("category " + all_Questions.results[0].correct_answer);
      console.log("category " + all_Questions.results[0].incorrect_answers);
      this.incorrectAnswersArray = all_Questions.results[0].incorrect_answers;
      console.log("incorrect_answer " + this.incorrectAnswersArray);
      this.incorrectAnswersArray.push(all_Questions.results[0].correct_answer);
      console.log("incorrect_answer " + this.incorrectAnswersArray);
      this.fisherYates(this.incorrectAnswersArray);
      console.log("incorrect_answer " + this.incorrectAnswersArray);

      // console.log("type " + this.q_.type);
      // console.log("difficulty " + this.q_.difficulty);
      // console.log("question " + this.q_.question);
      // console.log("answer " + this.q_.correctAnswer);
      // console.log("inc " + this.q_.incorrectAnswers);
      //this.incorrectAnswersArray = all_Questions.results[4];
      //console.log("");
      //console.log(all_Questions.results[3]);
      //this.question_ = all_Questions[0];
      //console.log(all_Questions);
      //this.q_ = all_Questions.results[3];
      //console.log(this.q_);
      //this.question_Asked = true;
    });
  }
}
